import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import Avatar from "../utils/Avatar"

export default function Testimonials() {
    return (
        <section className="py-6 md:pb-10 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-4 md:mb-8">Testimonial</h2>

                <div className="max-w-4xl mx-auto pt-10">
                    <div className="bg-slate-700 text-white rounded-2xl p-4 md:p-8 relative">
                        {/* Navigation arrows */}
                        <button className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 md:w-10 md:h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
                            <ChevronLeft className="w-3 h-3 md:w-5 md:h-5" />
                        </button>
                        <button className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 md:w-10 md:h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
                            <ChevronRight className="w-3 h-3 md:w-5 md:h-5" />
                        </button>

                        {/* Avatar */}
                        <div className="flex justify-center mb-6 absolute -top-10 left-1/2 transform -translate-x-1/2">
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center overflow-hidden">
                                <Avatar
                                    src="/images/homepage/testi-1.png"
                                    alt="Alfonso Carder"
                                    name="Alfonso Carder"
                                    size={64}
                                    className=""
                                />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="text-center pt-8 md:pt-5">
                            <h3 className="text-base md:text-xl font-semibold mb-2">Alfonso Carder</h3>

                            {/* Stars */}
                            <div className="flex justify-center mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>

                            {/* Quote */}
                            <div className="relative">
                                <span className="text-6xl text-white/20 absolute -top-4 -left-4">"</span>
                                <p className="text-[10px] md:text-base leading-relaxed px-8">
                                    Lorem ipsum dolor sit amet consectetur. Bibendum ultrices pellentesque ornare non est quisque in quis
                                    velit. Eu nunc vitae amet et faucibus. Purus mauris magna velit elementum suscipit orci.
                                </p>
                                <span className="text-6xl text-white/20 absolute -bottom-8 -right-4">"</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
