'use client'

export function BackgroundDecorations() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-[#F0ABFC] to-[#818CF8] opacity-10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] rounded-full bg-gradient-to-tr from-[#6D28D9] to-[#EC4899] opacity-10 blur-3xl"></div>

      {/* Floating shapes */}
      <div className="absolute top-[20%] left-[10%] w-16 h-16 bg-[#F0ABFC] opacity-20 rounded-full animate-float-slow"></div>
      <div className="absolute top-[40%] right-[15%] w-24 h-24 bg-[#818CF8] opacity-20 rounded-blob animate-float"></div>
      <div className="absolute bottom-[30%] left-[20%] w-20 h-20 bg-[#EC4899] opacity-20 rounded-blob-2 animate-float-medium"></div>

      {/* Barbie Pink Cursor Elements */}
      <div className="cursor-element style-1" style={{ top: '12%', right: '20%' }}></div>
      <div className="cursor-element style-2" style={{ top: '55%', left: '12%' }}></div>
      <div className="cursor-element style-3" style={{ top: '32%', left: '45%' }}></div>
      <div className="cursor-element style-4" style={{ bottom: '25%', right: '25%' }}></div>
      <div className="cursor-element style-1 pulse" style={{ top: '75%', right: '15%' }}></div>

      {/* Varied Heart Styles */}
      <div className="absolute top-[28%] left-[8%] scale-150 animate-float-diagonal-reverse">
        <div className="elegant-heart glow"></div>
      </div>

      <div className="absolute top-[48%] right-[6%] scale-200 animate-float-slow">
        <div className="outlined-heart glow-purple"></div>
      </div>

      <div className="absolute bottom-[18%] left-[15%] scale-150 animate-float-diagonal">
        <div className="elegant-heart glow"></div>
      </div>

      <div className="absolute top-[68%] right-[18%] scale-125 animate-float-diagonal-reverse">
        <div className="outlined-heart glow-purple"></div>
      </div>

      <div className="absolute top-[82%] left-[28%] scale-175 animate-wave">
        <div className="elegant-heart glow"></div>
      </div>

      {/* Decorative patterns */}
      <div className="absolute inset-0 bg-pattern opacity-[0.03]"></div>
    </div>
  )
}