import Image from "next/image";
import SmartLink from "./SmartLink";

export default function Avatar({
    src,
    alt,
    name,
    size = 32, // can be number or string
    className = "",
    textOnly = false,
    textClass = "",
    onClick,
    href = null,
}) {
    const getInitials = (name) => {
        if (!name) return "";
        const words = name.trim().split(" ");
        return words.map((w) => w[0]).slice(0, 2).join("").toUpperCase();
    };

    // Handle size input
    const isTailwindSize = typeof size === "string";
    const numericSize = typeof size === "number" ? size : null;
    const sizeClass = isTailwindSize ? size : "";
    const inlineSize = numericSize ? { width: numericSize, height: numericSize } : {};

    const content = src ? (
        <Image
            src={src}
            alt={alt}
            width={numericSize || 200}
            height={numericSize || 200}
            className="object-cover rounded-full w-full h-full"
            priority={false}
            quality={80}
        />
    ) : textOnly ? (
        <span
            className={`font-medium ${textClass} rounded-full overflow-hidden flex items-center justify-center w-full h-full`}
        >
            {name}
        </span>
    ) : (
        <span
            className={`font-medium text-gray-700 notranslate ${textClass}`}
            style={{ fontSize: numericSize ? numericSize / 2.5 : 14 }}
        >
            {getInitials(name)}
        </span>
    );

    const Wrapper = href ? SmartLink : "div";

    return (
        <Wrapper
            href={href}
            onClick={onClick}
            className={`rounded-full overflow-hidden bg-gray-300 flex items-center justify-center ${sizeClass} ${className} ${onClick ? "cursor-pointer" : ""}`}
            style={inlineSize}
        >
            {content}
        </Wrapper>
    );
}