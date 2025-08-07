import jsPDF from 'jspdf';

/**
 * JSON syntax highlighting colors (enhanced for better visibility)
 */
const JSON_COLORS = {
    string: [50, 205, 50],      // Brighter green for strings
    number: [220, 220, 170],    // Brighter light green for numbers
    boolean: [100, 180, 255],   // Brighter blue for booleans
    null: [100, 180, 255],      // Brighter blue for null
    key: [180, 240, 255],       // Brighter light blue for keys
    brace: [255, 255, 255],     // White for braces
    bracket: [255, 215, 0],     // Gold for brackets
    comma: [255, 255, 255],     // White for commas
    colon: [255, 255, 255],     // White for colons
    background: [25, 25, 25],   // Darker background for better contrast
    text: [255, 255, 255]       // White default text color
};

/**
 * Tokenizes JSON string for syntax highlighting
 */
const tokenizeJSON = (jsonString) => {
    const tokens = [];
    let i = 0;

    while (i < jsonString.length) {
        const char = jsonString[i];

        // Skip whitespace but preserve it for formatting
        if (/\s/.test(char)) {
            let whitespace = '';
            while (i < jsonString.length && /\s/.test(jsonString[i])) {
                whitespace += jsonString[i];
                i++;
            }
            tokens.push({ type: 'whitespace', value: whitespace });
            continue;
        }

        // String literals
        if (char === '"') {
            let str = '"';
            i++;
            while (i < jsonString.length && jsonString[i] !== '"') {
                if (jsonString[i] === '\\') {
                    str += jsonString[i] + (jsonString[i + 1] || '');
                    i += 2;
                } else {
                    str += jsonString[i];
                    i++;
                }
            }
            if (i < jsonString.length) str += '"';
            i++;

            // Determine if it's a key or value
            let j = i;
            while (j < jsonString.length && /\s/.test(jsonString[j])) j++;
            const isKey = jsonString[j] === ':';

            tokens.push({
                type: isKey ? 'key' : 'string',
                value: str
            });
            continue;
        }

        // Numbers
        if (/\d/.test(char) || (char === '-' && /\d/.test(jsonString[i + 1]))) {
            let num = '';
            if (char === '-') {
                num += char;
                i++;
            }
            while (i < jsonString.length && /[\d.]/.test(jsonString[i])) {
                num += jsonString[i];
                i++;
            }
            tokens.push({ type: 'number', value: num });
            continue;
        }

        // Booleans and null
        if (jsonString.substr(i, 4) === 'true') {
            tokens.push({ type: 'boolean', value: 'true' });
            i += 4;
            continue;
        }
        if (jsonString.substr(i, 5) === 'false') {
            tokens.push({ type: 'boolean', value: 'false' });
            i += 5;
            continue;
        }
        if (jsonString.substr(i, 4) === 'null') {
            tokens.push({ type: 'null', value: 'null' });
            i += 4;
            continue;
        }

        // Structural characters
        if (char === '{' || char === '}') {
            tokens.push({ type: 'brace', value: char });
        } else if (char === '[' || char === ']') {
            tokens.push({ type: 'bracket', value: char });
        } else if (char === ',') {
            tokens.push({ type: 'comma', value: char });
        } else if (char === ':') {
            tokens.push({ type: 'colon', value: char });
        } else {
            tokens.push({ type: 'text', value: char });
        }

        i++;
    }

    return tokens;
};

/**
 * Adds syntax-highlighted JSON to PDF with proper background coverage
 */
const addHighlightedJSON = (pdf, jsonObj, startX, startY, maxWidth) => {
    const jsonString = JSON.stringify(jsonObj, null, 2);
    const lines = jsonString.split('\n');

    const lineHeight = 7;
    const fontSize = 10;
    const padding = 10;

    pdf.setFontSize(fontSize);
    pdf.setFont('courier', 'bold');

    // Calculate total content height needed
    const totalContentHeight = lines.length * lineHeight + padding * 2;
    const pageHeight = pdf.internal.pageSize.getHeight();
    const availableHeight = pageHeight - startY - 30; // Leave space for footer

    // Function to add background for a section
    const addBackground = (x, y, width, height) => {
        pdf.setFillColor(...JSON_COLORS.background);
        pdf.rect(x - padding, y - padding, width + padding * 2, height, 'F');
        pdf.setDrawColor(100, 100, 100);
        pdf.setLineWidth(0.5);
        pdf.rect(x - padding, y - padding, width + padding * 2, height);
    };

    let currentY = startY;

    // Add background for first page
    const firstPageHeight = Math.min(totalContentHeight, availableHeight);
    addBackground(startX, currentY, maxWidth, firstPageHeight);

    // Process each line with syntax highlighting
    lines.forEach((line, lineIndex) => {
        // Check if we need a new page
        if (currentY + lineHeight > startY + availableHeight) {
            pdf.addPage();
            currentY = 30; // Reset to top of new page

            // Calculate remaining lines and height for new page
            const remainingLines = lines.length - lineIndex;
            const newPageHeight = Math.min(remainingLines * lineHeight + padding * 2, pageHeight - currentY - 30);
            addBackground(startX, currentY, maxWidth, newPageHeight);
        }

        // Tokenize and render the line
        const tokens = tokenizeJSON(line);
        let x = startX;

        tokens.forEach(token => {
            if (token.type === 'whitespace') {
                // Handle whitespace (indentation)
                x += pdf.getTextWidth(token.value);
            } else {
                // Check if token fits on current line
                const tokenWidth = pdf.getTextWidth(token.value);
                if (x + tokenWidth > startX + maxWidth) {
                    // Wrap to next line if needed
                    currentY += lineHeight;
                    x = startX;

                    // Check if we need a new page after wrapping
                    if (currentY + lineHeight > startY + availableHeight) {
                        pdf.addPage();
                        currentY = 30;
                        const remainingLines = lines.length - lineIndex;
                        const newPageHeight = Math.min(remainingLines * lineHeight + padding * 2, pageHeight - currentY - 30);
                        addBackground(startX, currentY, maxWidth, newPageHeight);
                        x = startX;
                    }
                }

                // Set color and render token
                const color = JSON_COLORS[token.type] || JSON_COLORS.text;
                pdf.setTextColor(...color);
                pdf.text(token.value, x, currentY);
                x += tokenWidth;
            }
        });

        currentY += lineHeight;
    });

    return currentY + padding;
};

/**
 * Generates a PDF with logo and beautifully formatted API response
 */
export const generateServiceResponsePDF = async (logData) => {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);

    let yPosition = margin;

    try {
        // Add logo
        const logoImg = new Image();
        logoImg.crossOrigin = 'anonymous';

        await new Promise((resolve, reject) => {
            logoImg.onload = resolve;
            logoImg.onerror = reject;
            logoImg.src = '/images/core/logo.jpg';
        });

        // Calculate logo dimensions (maintain aspect ratio)
        const logoMaxWidth = 60;
        const logoMaxHeight = 30;
        const logoAspectRatio = logoImg.width / logoImg.height;

        let logoWidth = logoMaxWidth;
        let logoHeight = logoMaxWidth / logoAspectRatio;

        if (logoHeight > logoMaxHeight) {
            logoHeight = logoMaxHeight;
            logoWidth = logoMaxHeight * logoAspectRatio;
        }

        // Add logo to PDF
        pdf.addImage(logoImg, 'JPEG', margin, yPosition, logoWidth, logoHeight);
        yPosition += logoHeight + 15;

    } catch (error) {
        console.warn('Could not load logo:', error);
        // Continue without logo
    }

    // Reset text color to black for headers
    pdf.setTextColor(0, 0, 0);

    // Add title
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Service Response Report', margin, yPosition);
    yPosition += 15;

    // Add service details
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');

    const details = [
        `Service: ${logData.service_name}`,
        `Date: ${new Date(logData.created_at).toLocaleString()}`,
        `Status: ${logData.status.toUpperCase()}`,
        `Price: Rs. ${logData.price_at_time}`,
        `HTTP Status: ${logData.http_status_code}`,
        `Log ID: ${logData.id}`
    ];

    details.forEach(detail => {
        pdf.text(detail, margin, yPosition);
        yPosition += 8;
    });

    yPosition += 10;

    // Add separator line
    pdf.setDrawColor(200, 200, 200);
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 15;

    // Add API Response section header
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(0, 0, 0);
    pdf.text('API Response:', margin, yPosition);
    yPosition += 12;

    // Add syntax-highlighted JSON
    yPosition = addHighlightedJSON(
        pdf,
        logData.api_response,
        margin,
        yPosition,
        contentWidth
    );

    // Add footer on last page
    const totalPages = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        const footerY = pageHeight - 15;
        pdf.setFontSize(8);
        pdf.setTextColor(128, 128, 128);
        pdf.setFont('helvetica', 'normal');
        pdf.text('Generated by DealerADO', margin, footerY);
        pdf.text(`Generated on: ${new Date().toLocaleString()}`, pageWidth - margin - 50, footerY);
        pdf.text(`Page ${i} of ${totalPages}`, pageWidth / 2 - 10, footerY);
    }

    return pdf;
};

/**
 * Downloads the generated PDF
 */
export const downloadServiceResponsePDF = async (logData) => {
    try {
        const pdf = await generateServiceResponsePDF(logData);
        const filename = `${logData.service_name}_${logData.id}_response.pdf`;
        pdf.save(filename);
    } catch (error) {
        console.error('Error generating PDF:', error);
        // Fallback to JSON download
        const dataStr = JSON.stringify(logData.api_response, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${logData.service_name}_${logData.id}_response.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
};