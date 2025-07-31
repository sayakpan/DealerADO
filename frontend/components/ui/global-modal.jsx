"use client";

import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

export default function GlobalModal({
	trigger,
	title,
	description,
	imageSrc,
	imageAlt = "Modal icon",
	primaryButton = { text: "Confirm", action: () => { } },
	secondaryButton = null, // { text: "Cancel", action: () => {} }
	open,
	onOpenChange,
	showCloseButton = true, // New prop to control close button visibility
	allowOutsideClick = true, // New prop to control outside click closing
	buttonLayout = "horizontal", // New prop: "horizontal" or "vertical"
}) {
	const [internalOpen, setInternalOpen] = useState(false);

	// Use external state if provided, otherwise use internal state
	const isOpen = open !== undefined ? open : internalOpen;
	const setIsOpen = onOpenChange || setInternalOpen;

	// Handle modal close - respect allowOutsideClick setting
	const handleOpenChange = (newOpen) => {
		if (!newOpen && !allowOutsideClick) {
			// Prevent closing if allowOutsideClick is false
			return;
		}
		setIsOpen(newOpen);
	};

	const handlePrimaryAction = () => {
		primaryButton.action();
		setIsOpen(false);
	};

	const handleSecondaryAction = () => {
		if (secondaryButton?.action) {
			secondaryButton.action();
		}
		setIsOpen(false);
	};

	const ModalContent = () => (
		<DialogContent
			className={!showCloseButton ? '[&>button]:hidden' : ''}
			style={{
				padding: 0,
				border: 0,
				backgroundColor: 'transparent',
				boxShadow: 'none',
				width: 'min(90vw, 570px)',
				maxWidth: 'none'
			}}
			onPointerDownOutside={(e) => {
				if (!allowOutsideClick) {
					e.preventDefault();
				}
			}}
			onEscapeKeyDown={(e) => {
				if (!allowOutsideClick) {
					e.preventDefault();
				}
			}}
		>
			<div style={{
				width: '100%',
				height: '400px',
				position: 'relative',
				backgroundColor: 'white',
				borderRadius: '30px',
				boxShadow: '0px 8px 60px 5px rgba(0,0,0,0.30)',
				overflow: 'hidden'
			}}>
				{/* Background ellipse with gradient */}
				<div style={{
					width: '678px',
					height: '384px',
					position: 'absolute',
					top: '-244px',
					left: '-49px',
					background: 'linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%)',
					borderRadius: '50%',
					zIndex: 1
				}} />

				{/* Red ellipse with mix-blend-darken */}
				<div style={{
					width: '678px',
					height: '384px',
					position: 'absolute',
					top: '-244px',
					left: '-49px',
					backgroundColor: '#B52628',
					borderRadius: '50%',
					mixBlendMode: 'darken',
					zIndex: 2
				}} />

				{/* Car image overlay ellipse */}
				<div style={{
					width: '678px',
					height: '384px',
					position: 'absolute',
					top: '-244px',
					left: '-49px',
					borderRadius: '50%',
					overflow: 'hidden',
					opacity: 0.3,
					zIndex: 3
				}}>
					<img
						src="/images/homepage/carbg1.png"
						alt="Car background"
						style={{
							width: '100%',
							height: '100%',
							objectFit: 'cover'
						}}
					/>
				</div>



				{/* White decorative blob */}
				<div style={{
					position: 'absolute',
					top: '50px',
					left: '50%',
					transform: 'translateX(-50%)',
					width: '140px',
					height: '120px',
					zIndex: 10
				}}>
					<svg style={{ width: '100%', height: '100%' }} viewBox="0 0 146 142" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M74.8115 17.7723C53.3331 20.6293 19.0078 5.52973 5.38807 22.3816C-8.17181 39.1594 12.5002 61.2166 16.1223 82.4827C19.1553 100.29 10.8944 122.316 24.4441 134.262C38.0211 146.232 59.5494 130.361 77.6456 130.73C98.5595 131.155 119.784 150.019 135.771 136.529C153.143 121.869 132.572 95.2601 132.925 72.532C133.315 47.3644 158.546 19.041 137.815 4.76637C117.519 -9.20844 99.2383 14.523 74.8115 17.7723Z"
							fill="white"
						/>
					</svg>
				</div>

				{/* Icon Image */}
				{imageSrc && (
					<div style={{
						position: 'absolute',
						top: '80px',
						left: '50%',
						transform: 'translateX(-50%)',
						width: '60px',
						height: '60px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						zIndex: 20
					}}>
						<Image
							width={60}
							height={60}
							src={imageSrc}
							alt={imageAlt}
							style={{
								width: '100%',
								height: '100%',
								objectFit: 'contain'
							}}
						/>
					</div>
				)}

				{/* Content Area */}
				<div style={{
					position: 'absolute',
					top: '200px',
					left: '0',
					right: '0',
					bottom: buttonLayout === 'vertical' && secondaryButton ? '140px' : '80px',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					padding: '0 30px',
					textAlign: 'center',
					zIndex: 5
				}}>
					<DialogHeader style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: '12px',
						width: '100%'
					}}>
						<DialogTitle style={{
							color: '#374151',
							fontSize: '24px',
							fontWeight: 'bold',
							lineHeight: '1.2',
							margin: 0
						}}>
							{title}
						</DialogTitle>
						{description && (
							<DialogDescription style={{
								color: '#9ca3af',
								fontSize: '14px',
								fontWeight: 'normal',
								lineHeight: '1.5',
								margin: 0,
								maxWidth: '90%',
								textAlign: 'center'
							}}>
								{description}
							</DialogDescription>
						)}
					</DialogHeader>
				</div>

				{/* Action buttons */}
				<div style={{
					position: 'absolute',
					bottom: '20px',
					left: '20px',
					right: '20px',
					display: 'flex',
					flexDirection: buttonLayout === 'vertical' ? 'column' : 'row',
					gap: '12px'
				}}>
					{secondaryButton ? (
						buttonLayout === 'vertical' ? (
							<>
								{/* Vertical layout - Primary button first */}
								<button
									onClick={handlePrimaryAction}
									style={{
										width: '100%',
										height: '48px',
										backgroundColor: '#374151',
										border: 'none',
										borderRadius: '24px',
										color: 'white',
										fontSize: '16px',
										fontWeight: '500',
										cursor: 'pointer',
										transition: 'background-color 0.2s',
										outline: 'none'
									}}
									onMouseEnter={(e) => e.target.style.backgroundColor = '#1f2937'}
									onMouseLeave={(e) => e.target.style.backgroundColor = '#374151'}
								>
									{primaryButton.text}
								</button>
								<button
									onClick={handleSecondaryAction}
									style={{
										width: '100%',
										height: '48px',
										backgroundColor: 'white',
										border: '2px solid #374151',
										borderRadius: '24px',
										color: '#374151',
										fontSize: '16px',
										fontWeight: '500',
										cursor: 'pointer',
										transition: 'background-color 0.2s',
										outline: 'none'
									}}
									onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
									onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
								>
									{secondaryButton.text}
								</button>
							</>
						) : (
							<>
								{/* Horizontal layout - Secondary button first */}
								<button
									onClick={handleSecondaryAction}
									style={{
										flex: 1,
										height: '48px',
										backgroundColor: 'white',
										border: '2px solid #374151',
										borderRadius: '24px',
										color: '#374151',
										fontSize: '16px',
										fontWeight: '500',
										cursor: 'pointer',
										transition: 'background-color 0.2s',
										outline: 'none'
									}}
									onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
									onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
								>
									{secondaryButton.text}
								</button>
								<button
									onClick={handlePrimaryAction}
									style={{
										flex: 1,
										height: '48px',
										backgroundColor: '#374151',
										border: 'none',
										borderRadius: '24px',
										color: 'white',
										fontSize: '16px',
										fontWeight: '500',
										cursor: 'pointer',
										transition: 'background-color 0.2s',
										outline: 'none'
									}}
									onMouseEnter={(e) => e.target.style.backgroundColor = '#1f2937'}
									onMouseLeave={(e) => e.target.style.backgroundColor = '#374151'}
								>
									{primaryButton.text}
								</button>
							</>
						)
					) : (
						<button
							onClick={handlePrimaryAction}
							style={{
								width: '100%',
								height: '48px',
								backgroundColor: '#374151',
								border: 'none',
								borderRadius: '24px',
								color: 'white',
								fontSize: '16px',
								fontWeight: '500',
								cursor: 'pointer',
								transition: 'background-color 0.2s',
								outline: 'none'
							}}
							onMouseEnter={(e) => e.target.style.backgroundColor = '#1f2937'}
							onMouseLeave={(e) => e.target.style.backgroundColor = '#374151'}
						>
							{primaryButton.text}
						</button>
					)}
				</div>
			</div>
		</DialogContent>
	);

	// If trigger is provided, render with trigger
	if (trigger) {
		return (
			<Dialog open={isOpen} onOpenChange={handleOpenChange}>
				<DialogTrigger asChild>
					{trigger}
				</DialogTrigger>
				<ModalContent />
			</Dialog>
		);
	}

	// If no trigger, render as controlled modal
	return (
		<Dialog open={isOpen} onOpenChange={handleOpenChange}>
			<ModalContent />
		</Dialog>
	);
}