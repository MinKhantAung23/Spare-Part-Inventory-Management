'use client';

export default function TermsAndConditions() {

    return (
        <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 print:bg-white print:py-0">
            <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-xl shadow-md border border-gray-100 print:shadow-none print:border-none print:p-0">

                {/* Header */}
                <header className="border-b border-gray-200 pb-6 text-center">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
                        Mobile Spare Part Inventory System
                    </h1>
                    <p className="text-lg font-medium text-blue-600">
                        Terms and Conditions (စည်းကမ်းချက်များနှင့် သဘောတူညီချက်များ)
                    </p>
                </header>

                {/* Preamble */}
                <section className="my-6 text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500 print:bg-transparent print:p-0 print:border-none">
                    <p>
                        ဤသဘောတူညီချက်သည် <strong className="text-gray-900">ဝန်ဆောင်မှုပေးသူ (ရောင်းချသူ)</strong> နှင့်{' '}
                        <strong className="text-gray-900">အသုံးပြုသူ (ဝယ်ယူသူ)</strong> တို့အကြား Mobile Spare Part Inventory System
                        အသုံးပြုခြင်းနှင့် စပ်လျဉ်း၍ နှစ်ဦးနှစ်ဖက် သဘောတူညီသော စည်းကမ်းချက်များ ဖြစ်ပါသည်။
                    </p>
                </section>

                {/* Terms Content */}
                <div className="space-y-8 my-8 text-gray-800">

                    {/* Section 1 */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                            <span className="bg-blue-100 text-blue-800 text-sm font-bold mr-3 px-2.5 py-1 rounded print:border print:border-gray-400">၁</span>
                            Software အသုံးပြုခွင့်ဆိုင်ရာ ကန့်သတ်ချက် (Software Licensing & Device Restrictions)
                        </h2>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600 ml-4">
                            <li>ဤ Software ကို ဝယ်ယူစဉ်က သတ်မှတ်ခွင့်ပြုထားသော Device (များ) ပေါ်တွင်သာ ထည့်သွင်းအသုံးပြုခွင့်ရှိသည်။</li>
                            <li>ဝန်ဆောင်မှုပေးသူ၏ ကြိုတင်ခွင့်ပြုချက် မရှိဘဲ အခြားသော Device များသို့ မိမိသဘောဖြင့် ပြောင်းရွှေ့ခြင်း၊ ကူးယူခြင်း သို့မဟုတ် ပြန်လည်ဖြန့်ချိခြင်းတို့ကို လုံးဝ (လုံးဝ) ခွင့်မပြုပါ။</li>
                        </ul>
                    </section>

                    {/* Section 2 */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                            <span className="bg-blue-100 text-blue-800 text-sm font-bold mr-3 px-2.5 py-1 rounded print:border print:border-gray-400">၂</span>
                            Error ပြင်ဆင်ခြင်းနှင့် အခမဲ့ ဝန်ဆောင်မှု (Maintenance & Bug Fixes)
                        </h2>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600 ml-4">
                            <li>
                                Software ၏ မူလ Code ပိုင်းဆိုင်ရာ ချို့ယွင်းချက်များ၊ Bug များနှင့် Error များကို ဝန်ဆောင်မှုခ (ဝါ) ပြင်ဆင်ခ လုံးဝမယူဘဲ{' '}
                                <strong className="text-emerald-600 font-semibold">(100% Free / 0% Fee)</strong> အခမဲ့ တတာဝန်ယူ ပြင်ဆင်ပေးပါမည်။
                            </li>
                        </ul>
                    </section>

                    {/* Section 3 */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                            <span className="bg-blue-100 text-blue-800 text-sm font-bold mr-3 px-2.5 py-1 rounded print:border print:border-gray-400">၃</span>
                            တာဝန်ယူမှု မရှိသည့် ကိစ္စရပ်များ (Exclusions & Limitations)
                        </h2>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600 ml-4">
                            <li>Software နှင့် တိုက်ရိုက်သက်ဆိုင်ခြင်းမရှိသော Hardware ပိုင်းဆိုင်ရာ ချို့ယွင်းမှုများ၊ စက်ပစ္စည်း ရုပ်ပိုင်းဆိုင်ရာ ထိခိုက်ပျက်စီးမှုများ (Physical Damages) အတွက် ဝန်ဆောင်မှုပေးသူတွင် တတာဝန်မရှိပါ။</li>
                            <li>အသုံးပြုသူ၏ ပေါ့ဆမှုကြောင့် ဖြစ်ပေါ်လာသော ပျက်စီးမှုများ သို့မဟုတ် မူလသဘောတူညီချက်ပြင်ပရှိ စနစ်ပြင်ဆင်ပြောင်းလဲမှုများ <strong className="text-gray-950 font-medium">(Additional Changes)</strong> အတွက် အခမဲ့ ပြင်ဆင်ပေးခြင်း အကျုံးမဝင်ပါ။</li>
                        </ul>
                    </section>

                    {/* Section 4 */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                            <span className="bg-blue-100 text-blue-800 text-sm font-bold mr-3 px-2.5 py-1 rounded print:border print:border-gray-400">၄</span>
                            နည်းပညာ ပံ့ပိုးကူညီမှုနှင့် ရုံးချိန်သတ်မှတ်ချက် (Technical Support Hours)
                        </h2>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600 ml-4">
                            <li>
                                Software နှင့် ပတ်သက်သော ကိစ္စရပ်များ၊ မေးမြန်းမှုများနှင့် နည်းပညာဆိုင်ရာ အကူအညီများကို ရုံးဖွင့်ရက် ရုံးချိန်အတွင်း ဖြစ်သော{' '}
                                <strong className="text-gray-950 font-semibold">နံနက် ၁၀:၀၀ နာရီ မှ ညနေ ၅:00 နာရီ (10:00 AM - 5:00 PM)</strong> အတွင်း အမြဲမပြတ် ဆောင်ရွက်ပေးသွားမည် ဖြစ်သည်။
                            </li>
                        </ul>
                    </section>

                    {/* Section 5 */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                            <span className="bg-blue-100 text-blue-800 text-sm font-bold mr-3 px-2.5 py-1 rounded print:border print:border-gray-400">၅</span>
                            စနစ်အဆင့်မြှင့်တင်ခြင်းနှင့် Feature အသစ်များ (System Customization & New Features)
                        </h2>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600 ml-4">
                            <li>မူလစနစ်တွင် မပါဝင်သေးသော Feature အသစ်များကို ထပ်မံထည့်သွင်းလိုပါက (သို့မဟုတ်) လုပ်ငန်းလိုအပ်ချက်အရ စနစ်ကို အတိုးအလျှော့ ပြုလုပ်လိုပါက ထပ်ဆင့်တိုးလာမည့် လုပ်ငန်းပမာဏအပေါ် မူတည်၍ သီးသန့်ကုန်ကျစရိတ် <strong className="text-gray-950 font-medium">(Additional Charges)</strong> များ ပေးဆောင်ရမည်။</li>
                        </ul>
                    </section>

                </div>
            </div>
        </main>
    );
}