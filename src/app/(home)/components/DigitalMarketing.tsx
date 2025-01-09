import React from "react";

const DigitalMarketing: React.FC = () => {
  return (
    <div
      className="w-full h-screen bg-cover bg-left bg-no-repeat md:bg-top lg:bg-left bg-black"
      style={{
        backgroundImage: "url(/11.png)",
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
                Digital Marketing{" "}
              </h2>
              <h2 dir="rtl" className="text-2xl font-semibold mb-6">
                اﻟﺘﺴﻮﻳﻖ اﻟﺮﻗﻤﻲ{" "}
              </h2>
            </div>
          </div>
          <div className="flex-1 p-4 md:p-8 text-white">
            <div className="mt-20">
              <h3 dir="rtl" className="text-xl font-semibold mb-2">
                أوﺻﻞ إلى ﺟﻤﻬﻮر ﻋﻼﻣﺘﻚ{" "}
              </h3>
              <h3 dir="rtl" className="text-xl font-semibold mb-2 text-white">
                <span className="text-[#a106ae]">زد ﻣﺒﻴﻌﺎﺗﻚ </span>
                اﻟﺘﺠﺎرﻳﺔ.
              </h3>
              <p dir="rtl" className="mb-10">
                ﻧﺤـــﻦ ﻧﺘـــﻤيز ﻋـــﻦ ﻏيرﻧﺎ في ﻣﺠـــﺎل اﻟﺘﺴـــﻮﻳﻖ اﻟﺮﻗﻤـــﻲ ﺑشيء
                ﻗﺪ ﻳﻜﻮن اﻷﻓﻀﻞ ﻟﺤﻞ ﻣﺸـــﻜﻠﺘﻚ. اﻟﺘﺴﻮﻳﻖ اﻟﺮﻗﻤﻲ ﺑﺎﻟﻨﺴﺒﺔ ﻟﻨﺎ ﺣﻞ ﻣﺸﻜﻠﺔ
                اﻟﺘﻮزﻳﻊ و المبيعات . وﻫﺬا ﻣﺎ ﻧﺴﻌﻰ إﻟﻴﻪ
              </p>
              <h3 className="text-xl font-semibold mb-2">Reach your Brand </h3>
              <h3 className="text-xl font-semibold text-white">
                Audience,{" "}
                <span className="text-[#a106ae]"> Increase your Sales. </span>
              </h3>
              <p className="mb-4">
                We are not distinguished from others in digital marketing by
                something that may be the best, but to solve your problem.
                Digital marketing means for us to solve the problem of
                distribution and sales, and this is what we really refer to.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalMarketing;
