import React from "react";

const ContentDevelopment: React.FC = () => {
  return (
    <div
      className="w-full h-screen bg-cover bg-left bg-no-repeat md:bg-top lg:bg-left bg-black"
      style={{
        backgroundImage: "url(/09.png)",
        backgroundSize: "60% auto",
        backgroundPosition: "left center",
      }}
    >
      {/* dummy maxwidth */}
      <div className="max-w-[1000px] mx-auto pt-20">
        <div className="flex gap-3">
          <div className="flex-1 p-4 md:p-8 text-white">
            <div className="w-fit">
              <h2 className="text-2xl font-semibold text-right">
                Content Development
              </h2>
              <h2 dir="rtl" className="text-2xl font-semibold mb-6">
                ﺗﻄﻮﻳﺮ المحتوى
              </h2>
            </div>
          </div>
          <div className="flex-1 p-4 md:p-8 text-white">
            <div className="mt-20">
              <h3 dir="rtl" className="text-xl font-semibold mb-2">
                أﺧبرﻫﻢ ﻣﻦ أﻧﺖ,
              </h3>
              <h3
                dir="rtl"
                className="text-xl font-semibold mb-2 text-[#074cb4] slide-from-right"
              >
                اﺟﻌﻠﻬﻢ ﻳﺆﻣﻨﻮن ﺑﻚ.{" "}
              </h3>
              <p dir="rtl" className="mb-10">
                ﻟﻴـــﺲ ﻣﺠﺮ ﻧﺺ ﻣﻘﺮوء ﺑﻞ ﻳﺠﻤﻊ ﺑين اﻟﻘﺮاءة واﻟﺨﻴﺎل ﻓﻴﻌﺘبر ﻋﻤﻠﻨﺎ في
                ﻣﺠـــﺎل إﻧﺸـــﺎء المحتوى اﻟﺮﻗﻤـــﻲ اﻟﺤﺪﻳـــﺚ ﻧﺎﻓﺬة ﺗﻨﻘﻠـــﻚ إلى
                ﻋﺎلم اﻟﺬﻫـــﻮل ﻣـــﻦ ﻛﻤﻴـــﺔ اﻟﺒﺴـــﺎﻃﺔ في طرح المعلومات
                اﻹﺛﺮاﺋﻴـــﺔ ﺑﻄﺮﻳﻘﺔ ﻗﺼﺼﻴﺔ ﺟﺬاﺑﺔ
              </p>
              <h3 className="text-xl font-semibold mb-2">
                Tell them who you are,
              </h3>
              <h3 className="text-xl font-semibold text-[#074cb4] slide-from-left">
                let them believe in you.
              </h3>
              <p className="mb-4">
                It is not just a readable text, but it combines reading and
                imagination, our work in the field of creating modem digital
                content is considered a window that transports you to the world
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentDevelopment;
