"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function GlobalModal({
  trigger,
  title,
  description,
  icon: Icon,
  primaryButton = { text: "Confirm", action: () => {} },
  secondaryButton = null, // { text: "Cancel", action: () => {} }
  open,
  onOpenChange,
  iconColor = "text-slate-700",
  primaryButtonVariant = "default",
  secondaryButtonVariant = "outline",
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  
  // Use external state if provided, otherwise use internal state
  const isOpen = open !== undefined ? open : internalOpen;
  const setIsOpen = onOpenChange || setInternalOpen;

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
    <DialogContent className="p-0 border-0 bg-transparent shadow-none max-w-[570px]">
      <div className="w-[570px] h-80 relative bg-white rounded-[30px] shadow-[0px_8px_60px_5px_rgba(0,0,0,0.30)] overflow-hidden">
        {/* Background decorative circles */}
        <div className="w-[678px] h-96 left-[-49px] top-[-244px] absolute rounded-full bg-gradient-to-br from-gray-200 to-gray-300" />
        <div className="w-[678px] h-96 left-[-49px] top-[-244px] absolute mix-blend-darken bg-red-700 rounded-full opacity-80" />
        
        {/* Car image overlay on red background */}
        <div className="w-[678px] h-96 left-[-49px] top-[-244px] absolute rounded-full overflow-hidden opacity-30">
          <img 
            src="/images/homepage/carbg1.png" 
            alt="Car background" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* White decorative blob */}
        <div className="left-[208px] top-[40px] absolute">
          <svg width="146" height="142" viewBox="0 0 146 142" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M74.8115 17.7723C53.3331 20.6293 19.0078 5.52973 5.38807 22.3816C-8.17181 39.1594 12.5002 61.2166 16.1223 82.4827C19.1553 100.29 10.8944 122.316 24.4441 134.262C38.0211 146.232 59.5494 130.361 77.6456 130.73C98.5595 131.155 119.784 150.019 135.771 136.529C153.143 121.869 132.572 95.2601 132.925 72.532C133.315 47.3644 158.546 19.041 137.815 4.76637C117.519 -9.20844 99.2383 14.523 74.8115 17.7723Z"
              fill="white"
            />
          </svg>
        </div>

        {/* Icon */}
        {Icon && (
          <div className="size-20 left-[241.11px] top-[71.64px] absolute overflow-hidden flex items-center justify-center">
            <Icon className={`w-12 h-12 ${iconColor}`} />
          </div>
        )}

        {/* Content */}
        <DialogHeader className="w-96 px-7 left-[72px] top-[175px] absolute flex flex-col justify-start items-center gap-3">
          <DialogTitle className="self-stretch text-center text-slate-700 text-2xl font-bold font-['Plus_Jakarta_Sans']">
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className="self-stretch text-center text-zinc-500 text-sm font-normal font-['Plus_Jakarta_Sans'] leading-tight">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        {/* Action buttons */}
        <div className="w-[530px] left-[20px] top-[267px] absolute flex justify-start items-start gap-3">
          {secondaryButton ? (
            <>
              <Button
                variant={secondaryButtonVariant}
                onClick={handleSecondaryAction}
                className="flex-1 h-12 rounded-2xl shadow-[0px_8px_16px_0px_rgba(0,0,0,0.12)] border-slate-700 text-slate-700 text-base font-semibold font-['Plus_Jakarta_Sans'] capitalize hover:bg-slate-50 bg-transparent"
              >
                {secondaryButton.text}
              </Button>
              <Button
                variant={primaryButtonVariant}
                onClick={handlePrimaryAction}
                className="flex-1 h-12 bg-slate-700 rounded-2xl shadow-[0px_8px_16px_0px_rgba(0,0,0,0.12)] text-white text-base font-semibold font-['Plus_Jakarta_Sans'] capitalize hover:bg-slate-800"
              >
                {primaryButton.text}
              </Button>
            </>
          ) : (
            <Button
              variant={primaryButtonVariant}
              onClick={handlePrimaryAction}
              className="w-full h-12 bg-slate-700 rounded-2xl shadow-[0px_8px_16px_0px_rgba(0,0,0,0.12)] text-white text-base font-semibold font-['Plus_Jakarta_Sans'] capitalize hover:bg-slate-800"
            >
              {primaryButton.text}
            </Button>
          )}
        </div>
      </div>
    </DialogContent>
  );

  // If trigger is provided, render with trigger
  if (trigger) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          {trigger}
        </DialogTrigger>
        <ModalContent />
      </Dialog>
    );
  }

  // If no trigger, render as controlled modal
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <ModalContent />
    </Dialog>
  );
}