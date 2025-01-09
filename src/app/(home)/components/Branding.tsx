import React from "react";

const Branding: React.FC = () => {
  return (
    <div
    id="branding"
      className="w-full h-screen bg-cover bg-left bg-no-repeat md:bg-top lg:bg-left bg-black"
      style={{
        backgroundImage: "url(/07.png)",
        backgroundSize: "60% auto",
        backgroundPosition: "left center",
      }}
    >
      {/* dummy maxwidth */}
      <div className="max-w-[1000px] mx-auto pt-20">
        <div className="flex gap-3">
          <div className="flex-1 p-4 md:p-8 text-white">
            <div className="w-fit">
              <h2 className="text-2xl font-semibold text-right">Branding</h2>
              <h2 dir="rtl" className="text-2xl font-semibold mb-6">
                العلامة التجارية
              </h2>
            </div>
          </div>
          <div className="flex-1 p-4 md:p-8 text-white">
            <div className="mt-20">
              <h3 dir="rtl" className="text-xl font-semibold mb-2">
                ﺻﻤﻢ ﻷﺟﻞ اﻟﺘﻐير،{" "}
              </h3>
              <h3
                dir="rtl"
                className="text-xl font-semibold mb-2 text-pink-500 slide-from-right"
              >
                ﻛُـــــــــــــــــــــــــــــــــــــــــــــــــــــــــﻦ
                اﻟﺘﻐير.
              </h3>
              <p dir="rtl" className="mb-10">
                ﻣﻦ ﺧﻼل اﻟﻨﻈﺮ إلى ﻣﺎ ﻫﻮ أﺑﻌﺪ ﻣﻦ اﻟﻌﻼﻣﺔ اﻟﺘﺠﺎرﻳﺔ إلى ﻣﺎ ﻳﻤﻜﻦ أن
                ﺗﺤﻘﻘـــﻪ اﻟﻌﻼﻣـــﺔ اﻟﺘﺠﺎر ﻳـــﺎ، ﻧﺤـــﻦ في +eleven ﻧﻘﻮد اﻟﻄﺮﻳﻖ
                ﻟﺠﻌﻞ ﻣﺎ ﺗﺮﻳﺪ اﻟﻌﻼﻣﺔ اﻟﺘﺠﺎرﻳﺔ أن ﺗﺼﻨﻌﻪ ﻫﻮ اﻹﺧﺘﻼف في ﻋﺎلمنا.
              </p>
              <h3 className="text-xl font-semibold mb-2">Design for change,</h3>
              <h3 className="text-xl font-semibold text-[#96bfb5] slide-from-left">
                Be the change.
              </h3>
              <p className="mb-4">
                By looking beyond, the brand, to what the brand is there to make
                happen we’re in eleven+ led the way to make what the brand wants
                to make is the difference in our world.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Branding;
