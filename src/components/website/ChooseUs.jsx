import React from "react";
import { ShieldCheck, Sparkles, Droplet, Leaf } from "lucide-react";

const detailsList = [
  {
    icon: <Leaf className="h-6 w-6" />,
    title: "১০০% প্রাকৃতিক উপাদান",
    description:
      "প্রাকৃতিক ভেষজ নির্যাস, তেল ও পুষ্টিকর উপাদানের সমন্বয়ে তৈরি। উপাদান সম্পর্কে বিস্তারিত জানতে পণ্যের তালিকা দেখুন।",
  },
  {
    icon: <Droplet className="h-6 w-6" />,
    title: "চুলের গোড়ায় পুষ্টি",
    description:
      "মাথার ত্বক ও চুলের গোড়ার পরিচর্যায় সহায়তা করে এবং চুলের নিয়মিত যত্নের অংশ হিসেবে ব্যবহার করা যায়।",
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "চুলের উজ্জ্বলতা ও সৌন্দর্য",
    description:
      "চুলের কোমলতা ও উজ্জ্বলতা বজায় রাখতে এবং মাথার ত্বকের পরিচর্যায় সহায়তা করে।",
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "চুলের ধরন অনুযায়ী যত্ন",
    description:
      "সোজা, কোঁকড়ানো, শুষ্ক কিংবা ক্ষতিগ্রস্ত চুলের যত্নে ব্যবহারের আগে পণ্যের উপাদান ও নির্দেশনা যাচাই করুন।",
  },
];

const ChooseUs = () => {
  return (
    <section
      id="benefits"
      className="relative overflow-hidden bg-gray-50/50 py-16 sm:py-20 lg:py-24"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* সেকশনের শিরোনাম */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-md border border-secondary/20 bg-secondary/5 px-3.5 py-1.5 text-[11px] font-extrabold tracking-wide text-secondary">
            সুন্দর ও স্বাস্থ্যোজ্জ্বল চুলের যত্ন
          </span>

          <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-primary sm:text-3xl lg:text-4xl">
            কেন বেছে নেবেন
            <span className="text-secondary"> আমাদের হেয়ার অয়েল?</span>
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-xs leading-6 text-gray-500 sm:text-sm">
            চুলের নিয়মিত পরিচর্যায় ভেষজ উপাদানে তৈরি আমাদের হেয়ার অয়েল
            সম্পর্কে জানুন এবং নিজের চুলের যত্ন নিন।
          </p>
        </div>

        {/* বৈশিষ্ট্যের কার্ডসমূহ */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {detailsList.map((item, index) => (
            <div
              key={index}
              className="group relative flex flex-col justify-between overflow-hidden border border-gray-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:shadow-md"
            >
              <div>
                {/* আইকন */}
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 transition-colors duration-300 group-hover:bg-secondary group-hover:text-white">
                  <div className="text-secondary transition-colors duration-300 group-hover:text-white">
                    {item.icon}
                  </div>
                </div>

                {/* শিরোনাম */}
                <h3 className="text-base font-extrabold text-primary sm:text-lg">
                  {item.title}
                </h3>

                {/* বিবরণ */}
                <p className="mt-2 text-xs leading-relaxed text-gray-500 sm:text-sm">
                  {item.description}
                </p>
              </div>

              {/* নিচের ডিজাইন */}
              <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-gray-100">
                <div className="h-full w-0 bg-secondary transition-all duration-500 group-hover:w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChooseUs;
