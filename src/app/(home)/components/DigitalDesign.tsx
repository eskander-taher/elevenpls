import React from "react";

const DigitalDesign: React.FC = () => {
  return (
    <div
      className="w-full h-screen bg-cover bg-left bg-no-repeat md:bg-top lg:bg-left bg-black"
      style={{
        backgroundImage: "url(/08.png)",
        backgroundSize: "60% auto",
        backgroundPosition: "right center",
      }}
    >
      {/* dummy maxwidth */}
      <div className="max-w-[1000px] mx-auto pt-20">
        <div className="flex flex-row-reverse gap-3">
          <div className="flex-1 p-4 md:p-8 text-white text-right">
            <div className="">
              <h2 className="text-2xl font-semibold text-right">
                Digital Design
              </h2>
              <h2 dir="rtl" className="text-2xl font-semibold mb-6">
                اﻟﺘﺼﻤﻴﻢ اﻟﺮﻗﻤﻲ{" "}
              </h2>
            </div>
          </div>
          <div className="flex-1 p-4 md:p-8 text-white">
            <div className="mt-20">
              <h3 dir="rtl" className="text-xl font-semibold mb-2">
                ﺣﻮل رﺳﺎﻟﺔ ﻋﻼﻣﺘﻚ{" "}
              </h3>
              <h3 dir="rtl" className="text-xl font-semibold mb-2 text-white">
                اﻟﺘﺠﺎرﻳـــــــــــــــــــــــــــــــــﺔ{" "}
                <span className="text-[#e28e7d]">إلى واﻗﻊ.</span>
              </h3>
              <p dir="rtl" className="mb-10">
                اﻟﺘﺼﻤﻴﻢ اﻟﺠﻤﻴﻞ ﻻ ﻳﻌني أﻧﻪ المناسب, ﻧﺼﻤﻢ ﺑﻌﻨﺎﻳﺔ ﻓﺎﺋﻘﺔ ﻣﺎﻳسرده
                المحتوى اﻟﺨـــﺎص ﺑـــﻚ ﻓﻬـــﻮ ﻟﻴﺲ ﻣﺠـــﺮد ﺗﺼﻤﻴﻤـــﺎ ﺑﺄﺷـــﻜﺎل
                وأﻟﻮان ﻣﺘﻌﺪدة ﺑﻞ إﻧﻪ ﻳﺸﻜﻞ ﻫﻨﺪﺳﺔ ﻣﺮﺋﻴﺔ ﻓﺎﺋﻘﺔ اﻟﺮوﻋﺔ ﺗﻨﺎﺳﺐ ﺟﻤﻬﻮرك
                المستهدف.
              </p>
              <h3 className="text-xl font-semibold mb-2"> Turn your Brand,</h3>
              <h3 className="text-xl font-semibold text-white">
                Message <span className="text-[#e28e7d]"> to Reality.</span>
              </h3>
              <p className="mb-4">
                Beautiful design doesn't mean it’s appropriate so we embrace the
                idea as alive and inspiring, we design very carefully what your
                content lists, as it is not just a design with multiple shapes
                and colors, but rather is forms a very impressive visual
                architecture that suits your target audience
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalDesign;
