import React from "react";

const UiuxDesign: React.FC = () => {
  return (
    <div
      className="w-full h-screen bg-cover bg-left bg-no-repeat md:bg-top lg:bg-left bg-black"
      style={{
        backgroundImage: "url(/10.png)",
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
                UIUX Design{" "}
              </h2>
              <h2 dir="rtl" className="text-2xl font-semibold mb-6">
                ﺗﺼﻤﻴﻢ اﻟﺘﻄﺒﻴﻘﺎت وﻣﻮاﻗﻊ اﻹﻧترﻧﺖ{" "}
              </h2>
            </div>
          </div>
          <div className="flex-1 p-4 md:p-8 text-white">
            <div className="mt-20">
              <h3 dir="rtl" className="text-xl font-semibold mb-2">
                ﺣﻞ ﻣﺸﻜﻠﺘﻚ,{" "}
              </h3>
              <h3
                dir="rtl"
                className="text-xl font-semibold mb-2 text-[#fae6fb]"
              >
                ﻣﺸﻜﻠــــــــــــــــــﺔ ﻋﻤﻴﻠﻚ.{" "}
              </h3>
              <p dir="rtl" className="mb-10">
                في ﻣـــﺎ ﻧﻘﺪﻣﻪ ﻣﻦ ﺗﺼﻤﻴﻢ المﻮاﻗﻊ اﻹﻟﻜتروﻧﻴﺔ ، ﻟﻴﺲ ﻣﺠﺮد ﺷـــﻜﻞ ﺑﻞ
                إﻧﻪ ﻳﻌﺘبر ﺣﻼ ﺣﻘﻴﻘﻴﺎ لمﺸﻜﻠﺔ ﺣﻘﻴﻘﻴﺔ في ﺟﻤﻴﻊ اﻟﻌﻨﺎصر. ﻋﻤﻠﻨﺎ في
                ﻫـــﺬا المﺠﺎل ﺳـــﻮارا آﻣﻨـــﺎ ﻻ ﻣﺘﻨﺎﻫـــﻲ ﻳﺠﻤﻊ اﻹﺑـــﺪاع ﺑﺘﻘﺪﻳﻢ
                ﻣﺎ ﺗﻄﻤﺢ إﻟﻴﻪ.
              </p>
              <h3 className="text-xl font-semibold mb-2">
                {" "}
                Solve your Problem,
              </h3>
              <h3 className="text-xl font-semibold text-[#fae6fb]">
                Your Client s Problem.{" "}
              </h3>
              <p className="mb-4">
                In what we offer from web and applications design, it is not
                just a form, but rather it is considered a real solution to a
                real problem in all elements. Our work in this field is an
                endless safe bracelet that combines creativity by providing what
                you aspire to
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UiuxDesign;
