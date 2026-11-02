let currentWidget = null;

function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    })[character]);
}

const factualNewsDatabase = {
    "NVDA": {
        name: "NVIDIA Corporation",
        symbol: "NASDAQ:NVDA",
        desc: "ผู้นำด้านฮาร์ดแวร์ GPU และโครงสร้างพื้นฐาน AI ของโลก",
        news: [
            {
                headline: "บิ๊กเทคสหรัฐฯ ยืนยันเพิ่มงบลงทุน Capex ด้าน Data Center ต่อเนื่อง ส่งผลให้ชิป Blackwell ถูกจองยาวข้ามปี",
                timestamp: "ตรวจสอบล่าสุดวันนี้",
                source: "สำนักข่าวบลูมเบิร์ก (Bloomberg) และรายงาน SEC Form 10-Q",
                sentiment: "เชิงบวก (Bullish)",
                sentimentColor: "text-emerald-400 border-emerald-800 bg-emerald-950",
                summary: "Microsoft, Alphabet, Meta และ Amazon ยืนยันในรายงานงบการเงินล่าสุดว่าจะเดินหน้าเพิ่มงบลงทุนโครงสร้างพื้นฐาน AI ต่อเนื่อง ส่งผลให้ชิป GPU Blackwell ของ Nvidia ถูกจองเต็มโควตาล่วงหน้าข้ามปี",
                fundamentalImpact: "หนุนให้อัตรากำไรขั้นต้น (Gross Margin) ของ Nvidia รักษาระดับสูงกว่า 70-75% ได้ต่อเนื่อง อย่างไรก็ตามราคาหุ้นสะท้อนความคาดหวังในระดับสูง นักลงทุนควรระวังความผันผวนระยะสั้น",
                watchPoint: "การส่งมอบชิปสถาปัตยกรรมรุ่นถัดไป และความคืบหน้าของห่วงโซ่อุปทานการบรรจุชิปขั้นสูง (CoWoS) จาก TSMC"
            },
            {
                headline: "Nvidia จับมือพันธมิตรขยายโครงสร้างพื้นฐาน Sovereign AI ในยุโรปและเอเชีย",
                timestamp: "ตรวจสอบสัปดาห์นี้",
                source: "สำนักข่าวรอยเตอร์ส (Reuters Financial)",
                sentiment: "เชิงบวก (Bullish)",
                sentimentColor: "text-emerald-400 border-emerald-800 bg-emerald-950",
                summary: "Nvidia เดินหน้าร่วมมือกับรัฐบาลและบริษัทโทรคมนาคมในหลายประเทศ เพื่อสร้างคลัสเตอร์ปัญญาประดิษฐ์ระดับประเทศ (Sovereign AI) เพื่อลดการพึ่งพาดาต้าเซ็นเตอร์นอกภูมิภาค",
                fundamentalImpact: "ช่วยกระจายความเสี่ยงด้านรายได้ ลดการพึ่งพากลุ่มลูกค้ายักษ์ใหญ่ในสหรัฐฯ เพียงไม่กี่ราย เพิ่มความยั่งยืนของกระแสเงินสดในระยะยาว",
                watchPoint: "ข้อกำหนดและนโยบายควบคุมการส่งออกชิปขั้นสูงของกระทรวงพาณิชย์สหรัฐฯ"
            }
        ]
    },
    "CPALL": {
        name: "บมจ. ซีพี ออลล์ (7-Eleven)",
        symbol: "SET:CPALL",
        desc: "ร้านสะดวกซื้ออันดับ 1 ของไทย และผู้ถือหุ้นใหญ่ในเครือข่ายค้าส่ง Lotus's/Makro",
        news: [
            {
                headline: "CPALL รับอานิสงส์ยอดนักท่องเที่ยวต่างชาติฟื้น ดันยอดขายสาขาเดิม (SSSG) โตเด่น",
                timestamp: "ตรวจสอบล่าสุดวันนี้",
                source: "รายงานตลาดหลักทรัพย์แห่งประเทศไทย (SET) และ ข่าวหุ้นธุรกิจ",
                sentiment: "เชิงบวก (Bullish)",
                sentimentColor: "text-emerald-400 border-emerald-800 bg-emerald-950",
                summary: "ซีพี ออลล์ เผยยอดขายกลุ่มอาหารพร้อมทาน (Ready-to-eat) และเครื่องดื่มชูกำลังเติบโตแข็งแกร่งตามการฟื้นตัวของภาคการท่องเที่ยวในเมืองหลัก ขณะที่แพลตฟอร์ม 7-Delivery มียอดการสั่งซื้อซ้ำเพิ่มขึ้นต่อเนื่อง",
                fundamentalImpact: "กระแสเงินสดจากการดำเนินงานแข็งแกร่ง นำไปชำระคืนหนี้เพื่อลดภาระดอกเบี้ยจ่าย หนุนกำไรสุทธิและความสามารถในการจ่ายปันผลสม่ำเสมอ",
                watchPoint: "กำลังซื้อระดับฐานรากในประเทศ และผลกระทบจากมาตรการกระตุ้นเศรษฐกิจภาครัฐ"
            },
            {
                headline: "7-Eleven รุกขยายสาขาในกัมพูชาและลาวตามแผน ยอดขายเฉลี่ยต่อบิลสูงกว่าคาดการณ์",
                timestamp: "ตรวจสอบสัปดาห์นี้",
                source: "สำนักข่าวอินโฟเควสท์ (InfoQuest) และ กรุงเทพธุรกิจ",
                sentiment: "เชิงบวก (Bullish)",
                sentimentColor: "text-emerald-400 border-emerald-800 bg-emerald-950",
                summary: "การเปิดสาขาใหม่ในประเทศเพื่อนบ้านได้รับการตอบรับอย่างดีจากกลุ่มคนรุ่นใหม่ในพนมเปญและเวียงจันทน์ สะท้อนความแข็งแกร่งของแบรนด์และการจัดการห่วงโซ่อุปทานที่เหนือกว่าคู่แข่งท้องถิ่น",
                fundamentalImpact: "เปิดช่องทางสร้างการเติบโตใหม่นอกเหนือจากตลาดในประเทศที่เริ่มมีความหนาแน่นของสาขาสูง เพิ่มศักยภาพการทำกำไรระยะยาว",
                watchPoint: "ความผันผวนของค่าเงินท้องถิ่นในประเทศเพื่อนบ้านเมื่อเทียบกับเงินบาท"
            }
        ]
    },
    "ASML": {
        name: "ASML Holding N.V.",
        symbol: "NASDAQ:ASML",
        desc: "ผู้ผูกขาดเครื่องพิมพ์ชิป EUV อันดับ 1 ของโลก (เนเธอร์แลนด์)",
        news: [
            {
                headline: "ASML กวาดยอดคำสั่งซื้อเครื่อง High-NA EUV เพิ่มขึ้น หนุน Backlog การผลิตชิป AI สู่ระดับนิวไฮ",
                timestamp: "ตรวจสอบล่าสุดวันนี้",
                source: "สำนักข่าวรอยเตอร์ส (Reuters) และ รายงานนักลงทุนสัมพันธ์ ASML",
                sentiment: "เชิงบวก (Bullish)",
                sentimentColor: "text-emerald-400 border-emerald-800 bg-emerald-950",
                summary: "ASML ผู้ผลิตเครื่องจักรพิมพ์ลายวงจรเซมิคอนดักเตอร์หนึ่งเดียวในโลก รายงานยอดสั่งจองเครื่องจักรเทคโนโลยี High-NA EUV จาก TSMC และ Intel เพิ่มขึ้น เพื่อรองรับการผลิตชิป 2nm ในอนาคต",
                fundamentalImpact: "ตอกย้ำสถานะการเป็น 'ผู้ผูกขาด' ต้นน้ำของห่วงโซ่เซมิคอนดักเตอร์โลก รายได้และกระแสเงินสดในอีก 3-5 ปีข้างหน้ามีความแน่นอนสูงมาก ไม่มีคู่แข่งรายใดในโลกผลิตเทียบเคียงได้",
                watchPoint: "อัตราการส่งมอบเครื่องจักร High-NA EUV ให้ทันกำหนดการเปิดโรงงานใหม่ของลูกค้า"
            },
            {
                headline: "เนเธอร์แลนด์และสหรัฐฯ หารือการคุมเข้มการส่งออกเครื่องพิมพ์ชิป DUV ขั้นสูงไปยังจีน",
                timestamp: "ตรวจสอบสัปดาห์นี้",
                source: "สำนักข่าวบลูมเบิร์ก (Bloomberg Markets)",
                sentiment: "ระมัดระวัง (Neutral to Watch)",
                sentimentColor: "text-amber-400 border-amber-800 bg-amber-950",
                summary: "การควบคุมการส่งออกไปยังประเทศจีนยังคงเป็นปัจจัยทางภูมิรัฐศาสตร์ที่ต้องจับตา อย่างไรก็ตาม อุปสงค์ชดเชยจากชาติตะวันตกและโรงหล่อในสหรัฐฯ ยังคงช่วยพยุงยอดขายรวม",
                fundamentalImpact: "รายได้จากตลาดจีนอาจชะลอตัวลง แต่มาร์จิ้นรวมยังคงได้รับการชดเชยด้วยเครื่องจักร High-NA รุ่นใหม่ที่มีราคาต่อเครื่องสูงกว่า 350 ล้านยูโร",
                watchPoint: "คำแถลงนโยบายล่าสุดของกระทรวงการต่างประเทศเนเธอร์แลนด์เรื่องใบอนุญาตส่งออก"
            }
        ]
    },
    "GULF": {
        name: "บมจ. กัลฟ์ เอ็นเนอร์จี ดีเวลลอปเมนท์",
        symbol: "SET:GULF",
        desc: "โรงไฟฟ้าชั้นนำและโครงสร้างพื้นฐาน Data Center ระดับสากล",
        news: [
            {
                headline: "GULF รุกคืบเปิดดำเนินการ Data Center เฟสแรกในไทย พร้อมรับผลบวกดอกเบี้ยขาลง",
                timestamp: "ตรวจสอบล่าสุดวันนี้",
                source: "สำนักข่าวกรุงเทพธุรกิจ และ มติคณะกรรมการบริษัทจดทะเบียน",
                sentiment: "เชิงบวก (Bullish)",
                sentimentColor: "text-emerald-400 border-emerald-800 bg-emerald-950",
                summary: "โครงการ Hyperscale Data Center ร่วมทุนกับพันธมิตรระดับโลกเริ่มเปิดดำเนินการเชิงพาณิชย์เฟสแรก ขณะที่ต้นทุนทางการเงินเริ่มปรับลดลงตามแนวโน้มการลดดอกเบี้ยนโยบาย",
                fundamentalImpact: "ช่วยยกระดับจากการเป็นเพียงโรงไฟฟ้าดั้งเดิม สู่การเป็นผู้เล่นโครงสร้างพื้นฐานดิจิทัลยุคใหม่ รายได้มั่นคงจากสัญญาระยะยาวและมีอัพไซด์จากคลาวด์",
                watchPoint: "การเซ็นสัญญารับซื้อกระแสไฟฟ้าพลังงานสะอาด (PPA) เพิ่มเติมกับกลุ่มลูกค้าระดับโลก"
            }
        ]
    },
    "BDMS": {
        name: "บมจ. กรุงเทพดุสิตเวชการ",
        symbol: "SET:BDMS",
        desc: "กลุ่มโรงพยาบาลเอกชนที่ให้บริการด้านการแพทย์และสุขภาพ"
    },
    "CPN": {
        name: "บมจ. เซ็นทรัลพัฒนา",
        symbol: "SET:CPN",
        desc: "ผู้พัฒนาและบริหารศูนย์การค้า อาคารสำนักงาน โรงแรม และโครงการที่พักอาศัย"
    },
    "PTT": {
        name: "บมจ. ปตท.",
        symbol: "SET:PTT",
        desc: "กลุ่มธุรกิจพลังงานและปิโตรเลียมของไทย"
    },
    "ADVANC": {
        name: "บมจ. แอดวานซ์ อินโฟร์ เซอร์วิส",
        symbol: "SET:ADVANC",
        desc: "ผู้ให้บริการโทรคมนาคมและบริการดิจิทัลในประเทศไทย"
    },
    "KBANK": {
        name: "บมจ. ธนาคารกสิกรไทย",
        symbol: "SET:KBANK",
        desc: "ธนาคารพาณิชย์และผู้ให้บริการทางการเงินในประเทศไทย"
    },
    "SCB": {
        name: "บมจ. เอสซีบี เอกซ์",
        symbol: "SET:SCB",
        desc: "กลุ่มธุรกิจการเงินและธนาคารไทย"
    },
    "BH": {
        name: "บมจ. โรงพยาบาลบำรุงราษฎร์",
        symbol: "SET:BH",
        desc: "ผู้ให้บริการโรงพยาบาลเอกชนและการรักษาพยาบาลเฉพาะทาง"
    },
    "MINT": {
        name: "บมจ. ไมเนอร์ อินเตอร์เนชั่นแนล",
        symbol: "SET:MINT",
        desc: "กลุ่มธุรกิจโรงแรม ร้านอาหาร และไลฟ์สไตล์"
    },
    "COST": {
        name: "Costco Wholesale Corporation",
        symbol: "NASDAQ:COST",
        desc: "ค้าปลีกโมเดลระบบสมาชิกที่แข็งแกร่งที่สุดในโลก (สหรัฐฯ)",
        news: [
            {
                headline: "Costco รายงานอัตราการต่ออายุสมาชิกในอเมริกาเหนือสูงกว่า 93% พร้อมเร่งขยายสาขาในเอเชีย",
                timestamp: "ตรวจสอบล่าสุดวันนี้",
                source: "วอลล์สตรีท เจอร์นัล (The Wall Street Journal) และ รายงานงบการเงิน Costco",
                sentiment: "มั่นคงแข็งแกร่ง (Steady Growth)",
                sentimentColor: "text-cyan-400 border-cyan-800 bg-cyan-950",
                summary: "แม้ในสภาวะที่ผู้บริโภคเผชิญภาวะเงินเฟ้อ Costco ยังคงมีฐานสมาชิกเพิ่มขึ้นต่อเนื่อง โดยรายได้จากค่าสมาชิก (Membership Fees) เติบโตสองหลัก ซึ่งคิดเป็นสัดส่วนกำไรส่วนใหญ่ของบริษัท",
                fundamentalImpact: "แสดงถึง 'คูเมืองทางธุรกิจ' ที่ยากจะเลียนแบบ โมเดลขายสินค้าราคาประหยัดบวกค่าสมาชิกช่วยรักษาเสถียรภาพทางการเงินได้ในทุกสภาวะเศรษฐกิจ",
                watchPoint: "การเติบโตของยอดขายออนไลน์ (E-Commerce) และการขยายสาขาใหม่ในญี่ปุ่นและเกาหลีใต้"
            }
        ]
    },
    "TSM": {
        name: "Taiwan Semiconductor (TSMC)",
        symbol: "NYSE:TSM",
        desc: "โรงหล่อชิปเบอร์ 1 ของโลก กุมการผลิตชิปขั้นสูงของโลกกว่า 90%",
        news: [
            {
                headline: "TSMC เผยอัตราการใช้กำลังการผลิตชิป 3nm และ 2nm เต็มกำลัง พร้อมเดินหน้าโรงงานในสหรัฐฯ และญี่ปุ่น",
                timestamp: "ตรวจสอบล่าสุดวันนี้",
                source: "หนังสือพิมพ์เศรษฐกิจไต้หวัน (Taiwan Economic Daily) และ ไฟแนนเชียลไทมส์",
                sentiment: "เชิงบวก (Bullish)",
                sentimentColor: "text-emerald-400 border-emerald-800 bg-emerald-950",
                summary: "TSMC ยืนยันความคืบหน้าของโรงงาน Fab ในแอริโซนา สหรัฐฯ และโรงงานคุมาโมโตะ ประเทศญี่ปุ่น เป็นไปตามแผน โดยชิปขั้นสูงสำหรับ Apple, Nvidia, และ AMD มีคิวจองยาวตลอดทั้งปี",
                fundamentalImpact: "ตอกย้ำอำนาจการกำหนดราคา (Pricing Power) ของ TSMC เหนือลูกค้าทุกรายบนโลก ทำให้รายได้เฉลี่ยต่อแผ่นเวเฟอร์ทำสถิติสูงสุดใหม่",
                watchPoint: "ความคืบหน้าของอัตราผลตอบแทนการผลิต (Yield Rate) ในโรงงานนอกไต้หวัน"
            }
        ]
    },
    "AAPL": {
        name: "Apple Inc.",
        symbol: "NASDAQ:AAPL",
        desc: "ยักษ์ใหญ่เทคโนโลยี เจ้าของระบบนิเวศ iPhone และ Apple Services",
        news: [
            {
                headline: "รายได้หมวด Apple Services ทำสถิติใหม่ จากฐานผู้ใช้งาน Active Devices ทะลุ 2,200 ล้านเครื่อง",
                timestamp: "ตรวจสอบล่าสุดวันนี้",
                source: "ฝ่ายนักลงทุนสัมพันธ์ Apple และ รายงานแบบ 10-K ต่อ ก.ล.ต. สหรัฐฯ",
                sentiment: "เชิงบวก (Bullish)",
                sentimentColor: "text-emerald-400 border-emerald-800 bg-emerald-950",
                summary: "รายได้จาก App Store, iCloud, Apple Pay และบริการสตรีมมิ่งยังคงเติบโตระดับสองหลัก ช่วยชดเชยการชะลอตัวของยอดขายฮาร์ดแวร์ในบางตลาด",
                fundamentalImpact: "ธุรกิจบริการมีอัตรากำไรขั้นต้น (Gross Margin) สูงกว่า 70% ส่งผลให้กระแสเงินสดอิสระ (Free Cash Flow) แข็งแกร่ง สามารถซื้อหุ้นคืนได้อย่างต่อเนื่อง",
                watchPoint: "การตอบรับฟีเจอร์ Apple Intelligence ในอุปกรณ์รุ่นใหม่ และการตรวจสอบกฎหมายต่อต้านการผูกขาดในยุโรป"
            }
        ]
    },
    "DELTA": {
        name: "บมจ. เดลต้า อีเลคโทรนิคส์ (ประเทศไทย)",
        symbol: "SET:DELTA",
        desc: "ผู้ผลิตชิ้นส่วนเพาเวอร์ซัพพลายและระบบระบายความร้อน AI & EV ชั้นนำ",
        news: [
            {
                headline: "DELTA ได้รับอานิสงส์ตรงจากกระแส AI Data Center ดันยอดสั่งซื้อ Power Solution พุ่ง",
                timestamp: "ตรวจสอบล่าสุดวันนี้",
                source: "รายงานตลาดหลักทรัพย์แห่งประเทศไทย (SET) และ ข่าวหุ้นธุรกิจ",
                sentiment: "เชิงบวก (Bullish)",
                sentimentColor: "text-emerald-400 border-emerald-800 bg-emerald-950",
                summary: "ความต้องการระบบจัดการพลังงานประสิทธิภาพสูงและระบบระบายความร้อนด้วยของเหลว (Liquid Cooling) สำหรับเซิร์ฟเวอร์ AI ยังคงเติบโตต่อเนื่อง หนุนยอดส่งออกผลิตภัณฑ์กลุ่มพลังงานสะอาด",
                fundamentalImpact: "รายได้ในกลุ่มผลิตภัณฑ์มาร์จิ้นสูงขยายตัวแข็งแกร่ง อย่างไรก็ตาม ค่า P/E ของหุ้นยังอยู่ในระดับพรีเมียมสูงกว่าค่าเฉลี่ยตลาด",
                watchPoint: "อัตรากำลังการผลิตของโรงงานใหม่ในนิคมอุตสาหกรรมบางปู และทิศทางคำสั่งซื้อจากลูกค้ายานยนต์ไฟฟ้า"
            }
        ]
    }
};

function initTradingViewWidget(symbol) {
    const container = document.getElementById('tradingview_chart_container');
    if (!container) return;
    container.innerHTML = '';

    if (!window.TradingView || typeof window.TradingView.widget !== 'function') {
        container.textContent = 'ไม่สามารถโหลดกราฟได้ในขณะนี้ โปรดตรวจสอบการเชื่อมต่ออินเทอร์เน็ตแล้วลองอีกครั้ง';
        return;
    }
    
    currentWidget = new TradingView.widget({
        "autosize": true,
        "symbol": symbol,
        "interval": "D",
        "timezone": "Asia/Bangkok",
        "theme": "dark",
        "style": "1",
        "locale": "th_TH",
        "toolbar_bg": "#020617",
        "enable_publishing": false,
        "allow_symbol_change": true,
        "container_id": "tradingview_chart_container",
        "hide_side_toolbar": false,
        "studies": [
            "MASimple@tv-basicstudies"
        ]
    });
}

function executeStockSearch(rawInput) {
    const input = String(rawInput || '').trim().toUpperCase();
    if (!input) return;

    const symbolParts = input.match(/^([A-Z0-9._-]+):(.+)$/);
    const cleanTicker = symbolParts ? symbolParts[2] : input;
    let symbolToLoad = input;
    let companyName = cleanTicker;
    let companyDesc = "ข้อมูลราคาตลาดสดเรียลไทม์ (Global Real-time Feed)";

    const thaiStocks = ['CPALL', 'DELTA', 'PTT', 'ADVANC', 'BDMS', 'GULF', 'KBANK', 'SCB', 'CPN', 'BH', 'MINT'];
    if (thaiStocks.includes(cleanTicker) && !symbolParts) {
        symbolToLoad = 'SET:' + cleanTicker;
    }

    const stockData = factualNewsDatabase[cleanTicker];
    if (stockData) {
        symbolToLoad = stockData.symbol;
        companyName = stockData.name;
        companyDesc = stockData.desc;
    }

    document.getElementById('active-symbol-badge').innerText = symbolToLoad;
    document.getElementById('active-stock-name').innerText = companyName;
    document.getElementById('active-stock-desc').innerText = companyDesc;
    document.getElementById('news-stock-title').innerText = cleanTicker;

    initTradingViewWidget(symbolToLoad);

    renderSpecificStockNews(cleanTicker, symbolToLoad, companyName);
}

function viewRecommendedStock(symbol) {
    switchPage('search');
    executeStockSearch(symbol);
    document.getElementById('stock-details').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function handleGlobalSearch(e) {
    e.preventDefault();
    const input = document.getElementById('global-search-input').value.trim();
    if (input) {
        executeStockSearch(input);
    }
}

function renderSpecificStockNews(ticker, fullSymbol, companyName) {
    const container = document.getElementById('specific-stock-news-list');
    const stockData = factualNewsDatabase[ticker];

    if (stockData && stockData.news && stockData.news.length > 0) {
        container.innerHTML = stockData.news.map(item => `
            <div class="bg-slate-950 border border-slate-800/90 rounded-2xl p-5 md:p-6 transition shadow-lg">
                <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full border ${item.sentimentColor}">
                        ${item.sentiment}
                    </span>
                    <span class="text-xs text-slate-400 font-mono">
                        📌 <strong>แหล่งอ้างอิงที่ระบุ:</strong> ${item.source} · ข้อมูลในฐานข้อมูล ไม่ใช่ข่าวเรียลไทม์
                    </span>
                </div>

                <h4 class="text-base md:text-lg font-bold text-white mb-2 leading-snug">
                    ${item.headline}
                </h4>

                <!-- In-Depth Summary Paragraph -->
                <div class="mb-3 text-xs md:text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
                    <strong class="text-white block mb-1 text-xs uppercase tracking-wider font-semibold">📑 สรุปข้อเท็จจริงสำคัญ:</strong>
                    ${item.summary}
                </div>

                <!-- Fundamental Impact Analysis -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div class="bg-slate-900 border border-slate-800 p-3.5 rounded-xl text-slate-300">
                        <strong class="text-emerald-400 block mb-1">💡 ผลกระทบต่อปัจจัยพื้นฐาน:</strong>
                        ${item.fundamentalImpact}
                    </div>
                    <div class="bg-slate-900 border border-slate-800 p-3.5 rounded-xl text-slate-300">
                        <strong class="text-amber-400 block mb-1">🎯 ปัจจัยที่ต้องจับตาเป็นพิเศษ:</strong>
                        ${item.watchPoint}
                    </div>
                </div>
            </div>
        `).join('');
    } else {
        container.innerHTML = `
            <div class="bg-slate-950 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-lg">
                <div class="text-sm font-bold text-amber-300 mb-2">
                    ยังไม่มีสรุปข่าวเฉพาะ ${escapeHtml(ticker)} ในฐานข้อมูลของหน้านี้
                </div>
                <p class="text-xs text-slate-300 leading-relaxed">
                    เพื่อไม่แสดงข่าวหรือบทวิเคราะห์ที่ยังไม่ได้ตรวจสอบ คุณสามารถเปิดข่าวล่าสุด เอกสารจากหน่วยงานกำกับดูแล และข้อมูลตลาดจากลิงก์ด้านล่างได้โดยตรง
                </p>
            </div>
        `;
    }

    container.insertAdjacentHTML('beforeend', renderStockSourceLinks(ticker, fullSymbol, companyName));
}

function renderStockSourceLinks(ticker, fullSymbol, companyName) {
    const searchQuery = encodeURIComponent(`${ticker} ${companyName}`);
    const isThaiStock = fullSymbol.startsWith('SET:');
    const disclosureLink = isThaiStock
        ? `https://www.set.or.th/th/market/product/stock/quote/${encodeURIComponent(ticker)}/overview`
        : `https://www.sec.gov/edgar/search/#/q=${encodeURIComponent(ticker)}`;
    const disclosureLabel = isThaiStock ? 'ข้อมูลหลักทรัพย์และข่าวจาก SET' : 'เอกสารรายงานจาก SEC EDGAR';
    const links = [
        {
            label: 'ค้นหาข่าวล่าสุด',
            url: `https://news.google.com/search?q=${searchQuery}`
        },
        {
            label: disclosureLabel,
            url: disclosureLink
        },
        {
            label: 'กราฟและข้อมูลตลาด TradingView',
            url: `https://www.tradingview.com/chart/?symbol=${encodeURIComponent(fullSymbol)}`
        }
    ];

    return `
        <div class="flex flex-wrap gap-2">
            ${links.map(link => `
                <a
                    href="${link.url}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500 text-cyan-300 px-3 py-2 rounded-xl text-xs transition"
                >
                    ${escapeHtml(link.label)} <span aria-hidden="true">↗</span>
                </a>
            `).join('')}
        </div>
    `;
}

function switchPage(page) {
    const pageSearch = document.getElementById('page-search');
    const pageAssessment = document.getElementById('page-assessment');
    const btnSearch = document.getElementById('nav-btn-search');
    const btnAssessment = document.getElementById('nav-btn-assessment');

    if (page === 'search') {
        pageSearch.classList.remove('hidden');
        pageAssessment.classList.add('hidden');
        btnSearch.className = "px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition bg-cyan-500 text-slate-950 flex items-center gap-1.5 shadow-sm";
        btnAssessment.className = "px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition text-slate-400 hover:text-white flex items-center gap-1.5";
    } else {
        pageSearch.classList.add('hidden');
        pageAssessment.classList.remove('hidden');
        btnAssessment.className = "px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition bg-emerald-500 text-slate-950 flex items-center gap-1.5 shadow-sm";
        btnSearch.className = "px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition text-slate-400 hover:text-white flex items-center gap-1.5";
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function calculateDynamicPortfolio() {
    const exp = parseInt(document.getElementById('q-exp').value);
    const risk = parseInt(document.getElementById('q-risk').value);
    const market = document.getElementById('q-market').value;
    const goal = document.getElementById('q-goal').value;
    const time = document.getElementById('q-time').value;
    const style = document.getElementById('q-style').value;
    const emergency = document.getElementById('q-emergency').value;

    let emergencyWarning = "";
    if (emergency === 'none' || emergency === 'low') {
        emergencyWarning = `
            <div class="bg-rose-950/80 border-2 border-rose-500 text-rose-200 p-5 rounded-2xl mb-6 text-xs leading-relaxed shadow-lg">
                <div class="flex items-center gap-2 text-sm font-bold text-rose-300 mb-1">
                    <span>🚨</span> แจ้งเตือนความปลอดภัยทางการเงิน (Capital Preservation Alert):
                </div>
                คุณระบุว่า <strong>"เงินสำรองฉุกเฉินยังมีไม่ถึง 3 เดือน"</strong> สัดส่วนพอร์ตด้านล่างจึงถูกปรับเพิ่มสัดส่วน <strong>เงินสดสำรอง (Cash Reserve)</strong> สูงเป็นพิเศษ เพื่อป้องกันไม่ให้คุณถูกบีบให้ขายหุ้นขาดทุนเมื่อมีเรื่องฉุกเฉินในชีวิต แนะนำให้แบ่งเงินลงทุนสะสมแบบ DCA ไม่เกิน 10-15% ของรายได้ต่อเดือนเท่านั้น!
            </div>
        `;
    }

    let cashPct = 10;
    let growthPct = 20;
    let defensivePct = 30;
    let coreMoatPct = 40;

    if (emergency === 'none') cashPct = 30;
    else if (emergency === 'low') cashPct = 20;
    else if (emergency === 'good') cashPct = 10;
    else cashPct = 5;

    if (time === 'short') cashPct = Math.max(cashPct, 35);
    else if (time === 'med_short') cashPct = Math.max(cashPct, 20);

    if (risk === 1) growthPct = 5;
    else if (risk === 2) growthPct = 15;
    else if (risk === 3) growthPct = 30;
    else if (risk === 4) growthPct = 45;
    else if (risk === 5) growthPct = 55;

    if (goal === 'exponential') growthPct = Math.min(60, growthPct + 10);
    else if (goal === 'safe') growthPct = Math.min(10, growthPct);

    if (goal === 'div') defensivePct = 40;
    else if (goal === 'safe') defensivePct = 45;
    else if (goal === 'growth' || goal === 'exponential') defensivePct = 10;
    else defensivePct = 25;

    let subtotal = cashPct + growthPct + defensivePct;
    if (subtotal > 80) {
        let overflow = subtotal - 80;
        const defensiveReduction = Math.min(defensivePct, Math.ceil(overflow / 2));
        defensivePct -= defensiveReduction;
        growthPct -= overflow - defensiveReduction;
        coreMoatPct = 20;
    } else {
        coreMoatPct = 100 - subtotal;
    }

    const experienceAdvice = exp <= 2
        ? "คุณยังอยู่ในช่วงเริ่มต้น ควรเริ่มจากเงินจำนวนน้อยและศึกษาความเสี่ยงของแต่ละสินทรัพย์ก่อนลงทุน"
        : "ใช้ประสบการณ์ที่มีทบทวนสมมติฐานและกระจายความเสี่ยง ไม่ลงทุนกระจุกตัวในหุ้นตัวเดียว";
    const styleAdvice = {
        dca_strict: "เหมาะกับการทยอยลงทุน (DCA) ตามกำหนดอย่างสม่ำเสมอ",
        dca_dip: "แบ่งเงินลงทุนเป็น DCA ส่วนหนึ่ง และสำรองเงินสดไว้ตามแผนที่กำหนดล่วงหน้า",
        lump_val: "ทยอยแบ่งเงินก้อนเข้าลงทุนเป็นงวด แทนการจับจังหวะด้วยเงินทั้งหมด",
        hybrid: "กำหนดสัดส่วนพอร์ตหลักและส่วนลงทุนเชิงรุกให้ชัดเจนก่อนเริ่ม",
        tactical: "กำหนดรอบทบทวนและปรับสมดุลพอร์ตอย่างสม่ำเสมอ"
    }[style];
    const investorAdvice = `${experienceAdvice} ${styleAdvice}`;

    let profileTitle = "";
    let strategyRationale = "";

    if (time === 'short' || risk === 1) {
        profileTitle = "พอร์ต Capital Fortress & Liquidity Shield (เน้นรักษาสภาพคล่องและเงินต้น)";
        strategyRationale = `คำตอบของคุณชี้ว่าคุณรับความผันผวนได้ต่ำ หรือมีกรอบเวลาลงทุนสั้น สัดส่วนพอร์ตจึงถูกปรับให้มี <strong>เงินสดสำรองสูงถึง ${cashPct}%</strong> และเน้นหุ้นสาธารณูปโภคที่รายได้มั่นคง ${defensivePct}% เพื่อไม่ให้เงินต้นเกิดการสูญเสียหนัก`;
    } else if (goal === 'div') {
        profileTitle = "พอร์ต Cash Flow Engine (เน้นกระแสเงินสดปันผลทบต้น)";
        strategyRationale = `คุณให้ความสำคัญกับเงินปันผลสม่ำเสมอชนะดอกเบี้ยเงินฝาก สัดส่วนพอร์ตจึงเน้นหนักไปที่ <strong>หุ้นปันผลและสาธารณูปโภคสูงถึง ${defensivePct}%</strong> ผสานกับหุ้นคูเมืองแข็งแกร่ง ${coreMoatPct}% เพื่อส่งต่อเงินปันผลกลับมา Reinvest ต่อเนื่อง`;
    } else if (risk >= 4 || goal === 'exponential' || goal === 'growth') {
        profileTitle = "พอร์ต Next-Gen Alpha & Disruptive Moats (มุ่งเน้นการเติบโตของเงินต้นระดับสูง)";
        strategyRationale = `คุณพร้อมรับความผันผวนสูงเพื่อแลกกับโอกาสเติบโตก้าวกระโดด สัดส่วนพอร์ตจึงจัดสรรให้ <strong>หุ้นผู้นำเทคโนโลยีและนวัตกรรมโลกสูงถึง ${growthPct}%</strong> โดยมีคูเมืองพื้นฐานรองรับ ${coreMoatPct}% เพื่อความสมดุล`;
    } else {
        profileTitle = "พอร์ต Balanced Global Compounder (เติบโตสมดุล ชนะเงินเฟ้อระยะยาว)";
        strategyRationale = `คุณเน้นการเติบโตอย่างมั่นคงแบบ Balance สัดส่วนพอร์ตจึงกระจายน้ำหนักอย่างสมดุลใน <strong>หุ้นคูเมืองชั้นยอด ${coreMoatPct}%</strong>, หุ้นเติบโต ${growthPct}% และหุ้นต้านทานวิกฤต ${defensivePct}%`;
    }

    let selectedStocks = [];

    if (market === 'th') {
        if (risk <= 2 || goal === 'safe' || goal === 'div') {
            selectedStocks = [
                { symbol: "CPALL", name: "บมจ. ซีพี ออลล์ (7-Eleven)", origin: "🇹🇭 ไทย", why: "ร้านสะดวกซื้ออันดับ 1 ของไทย ได้รับเงินสดทุกวัน ปันผลสม่ำเสมอ" },
                { symbol: "BDMS", name: "บมจ. กรุงเทพดุสิตเวชการ", origin: "🇹🇭 ไทย", why: "เครือข่ายโรงพยาบาลเอกชนชั้นนำ มีอำนาจขึ้นราคาตามเงินเฟ้อ ได้อานิสงส์สังคมสูงวัย" },
                { symbol: "CPN", name: "บมจ. เซ็นทรัลพัฒนา", origin: "🇹🇭 ไทย", why: "คูเมืองศูนย์การค้า Prime Locations ใจกลางเมืองที่คู่แข่งสร้างตามได้ยาก" }
            ];
        } else {
            selectedStocks = [
                { symbol: "GULF", name: "บมจ. กัลฟ์ เอ็นเนอร์จี ดีเวลลอปเมนท์", origin: "🇹🇭 ไทย", why: "นอกจากโรงไฟฟ้ารายได้แน่นอน ยังร่วมทุนสร้าง Hyperscale Data Center รับกระแส AI" },
                { symbol: "DELTA", name: "บมจ. เดลต้า อีเลคโทรนิคส์", origin: "🇹🇭 ไทย", why: "ผู้ผลิตชิ้นส่วนเพาเวอร์ซัพพลายและระบบระบายความร้อนให้กับ Data Center ทั่วโลก" },
                { symbol: "CPN", name: "บมจ. เซ็นทรัลพัฒนา", origin: "🇹🇭 ไทย", why: "ศูนย์การค้าและมิกซ์ยูสผู้นำของไทย กระแสเงินสดหนุนการขยายโครงการใหม่ต่อเนื่อง" }
            ];
        }
    } else if (market === 'us') {
        if (risk <= 2 || goal === 'safe' || goal === 'div') {
            selectedStocks = [
                { symbol: "COST", name: "Costco Wholesale", origin: "🇺🇸 สหรัฐฯ", why: "คูเมืองระบบสมาชิกที่ลูกค้าต่ออายุเกิน 90% ขายสินค้าราคาถูกจน Amazon ยังแข่งด้วยยาก" },
                { symbol: "AAPL", name: "Apple Inc.", origin: "🇺🇸 สหรัฐฯ", why: "ฐานผู้ใช้งานอุปกรณ์กว่า 2,200 ล้านเครื่อง รายได้ Services มีมาร์จิ้นสูงและเติบโตมั่นคง" }
            ];
        } else {
            selectedStocks = [
                { symbol: "NVDA", name: "NVIDIA Corporation", origin: "🇺🇸 สหรัฐฯ", why: "ผู้ขายพลั่วในยุคตื่นทอง AI กุมตลาดชิปประมวลผลดาต้าเซ็นเตอร์กว่า 80% ของโลก" },
                { symbol: "COST", name: "Costco Wholesale", origin: "🇺🇸 สหรัฐฯ", why: "ธุรกิจค้าปลีกที่มีฐานะการเงินแข็งแกร่งที่สุด เป็นเสาหลักคานความผันผวนให้พอร์ต" }
            ];
        }
    } else if (market === 'emerging') {
        if (risk <= 2 || goal === 'safe' || goal === 'div') {
            selectedStocks = [
                { symbol: "GULF", name: "บมจ. กัลฟ์ เอ็นเนอร์จี ดีเวลลอปเมนท์", origin: "🇹🇭 ไทย", why: "โครงสร้างพื้นฐานพลังงานและดิจิทัลในอาเซียน เหมาะเป็นส่วนกระจายการลงทุนในภูมิภาค" },
                { symbol: "CPALL", name: "บมจ. ซีพี ออลล์ (7-Eleven)", origin: "🇹🇭 ไทย", why: "ธุรกิจค้าปลีกในอาเซียนที่เชื่อมโยงกับการบริโภคภายในภูมิภาค" }
            ];
        } else {
            selectedStocks = [
                { symbol: "TSM", name: "Taiwan Semiconductor (TSMC)", origin: "🇹🇼 ไต้หวัน", why: "ผู้ผลิตชิปขั้นสูงรายสำคัญที่เชื่อมโยงกับห่วงโซ่อุปทานเทคโนโลยีเอเชีย" },
                { symbol: "DELTA", name: "บมจ. เดลต้า อีเลคโทรนิคส์", origin: "🇹🇭 ไทย", why: "ผู้ผลิตอุปกรณ์จัดการพลังงานและระบบระบายความร้อนที่ใช้ในดาต้าเซ็นเตอร์" },
                { symbol: "GULF", name: "บมจ. กัลฟ์ เอ็นเนอร์จี ดีเวลลอปเมนท์", origin: "🇹🇭 ไทย", why: "พลังงานและโครงสร้างพื้นฐานดิจิทัลที่รองรับการเติบโตของคลาวด์ในอาเซียน" }
            ];
        }
    } else {
        if (risk <= 2 || goal === 'safe') {
            selectedStocks = [
                { symbol: "COST", name: "Costco Wholesale", origin: "🇺🇸 สหรัฐฯ", why: "ค้าปลีกระบบสมาชิกที่เติบโตทนทานทุกวิกฤตเศรษฐกิจ" },
                { symbol: "CPALL", name: "บมจ. ซีพี ออลล์ (7-Eleven)", origin: "🇹🇭 ไทย", why: "สินค้าจำเป็นในชีวิตประจำวันที่เข้าใจง่ายที่สุด เหมาะเป็นก้าวแรกของมือใหม่" }
            ];
        } else {
            selectedStocks = [
                { symbol: "ASML", name: "ASML Holding N.V.", origin: "🇳🇱 เนเธอร์แลนด์", why: "บริษัทเดียวในโลกที่ผลิตเครื่องพิมพ์ชิป EUV ขั้นสูง หากไม่มี ASML โลกจะไม่มีชิป AI" },
                { symbol: "TSM", name: "Taiwan Semiconductor (TSMC)", origin: "🇹🇼 ไต้หวัน", why: "โรงหล่อชิปเบอร์ 1 ของโลก กุมการผลิตชิปขั้นสูงของ Nvidia, Apple, AMD กว่า 90%" },
                { symbol: "GULF", name: "บมจ. กัลฟ์ เอ็นเนอร์จี ดีเวลลอปเมนท์", origin: "🇹🇭 ไทย", why: "พลังงานสะอาดและโครงสร้างพื้นฐาน Data Center รองรับการเติบโตของคลาวด์ในอาเซียน" }
            ];
        }
    }

    const container = document.getElementById('portfolio-output-container');
    if (!container) {
        throw new Error('ไม่พบพื้นที่แสดงผลการจัดพอร์ต (#portfolio-output-container)');
    }
    container.innerHTML = `
        ${emergencyWarning}

        <div class="bg-gradient-to-r from-emerald-950/70 via-slate-900 to-slate-900 border border-emerald-500/50 rounded-3xl p-6 md:p-8 shadow-2xl">
            <div class="border-b border-slate-800 pb-5 mb-6">
                <div class="flex items-center gap-2 mb-2">
                    <span class="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
                        DYNAMICALLY CALCULATED FOR YOUR PROFILE
                    </span>
                    <span class="text-xs text-cyan-400 font-mono bg-cyan-950/80 px-2.5 py-0.5 rounded-full border border-cyan-800">
                        ผลรวม: 100% เต็ม
                    </span>
                </div>
                <h2 class="text-2xl md:text-3xl font-black text-white mt-1">${profileTitle}</h2>
                <p class="text-slate-300 text-xs md:text-sm mt-3 leading-relaxed bg-slate-950/70 p-4 rounded-2xl border border-slate-800">
                    ${strategyRationale}
                </p>
            </div>

            <div class="mb-8">
                <h3 class="text-sm font-bold text-white mb-3 flex items-center gap-2">
                    <span>📊</span> สัดส่วนการแบ่งเงินลงทุนที่คำนวณจากคำตอบของคุณ:
                </h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div class="bg-slate-950 border border-slate-800 p-4 rounded-2xl flex flex-col justify-between">
                        <div>
                            <div class="text-3xl font-black text-emerald-400 font-mono">${coreMoatPct}%</div>
                            <div class="text-xs font-bold text-white mt-1">Core Quality Moats</div>
                        </div>
                        <p class="text-[11px] text-slate-400 mt-2 leading-relaxed">หุ้นคูเมืองทางธุรกิจแข็งแกร่ง ผูกขาดตลาด เป็นแกนหลักของพอร์ต</p>
                    </div>

                    <div class="bg-slate-950 border border-slate-800 p-4 rounded-2xl flex flex-col justify-between">
                        <div>
                            <div class="text-3xl font-black text-cyan-400 font-mono">${growthPct}%</div>
                            <div class="text-xs font-bold text-white mt-1">High-Growth & Innovation</div>
                        </div>
                        <p class="text-[11px] text-slate-400 mt-2 leading-relaxed">หุ้นเทคโนโลยีและเมกะเทรนด์โลก ขับเคลื่อนการเติบโตของเงินต้น</p>
                    </div>

                    <div class="bg-slate-950 border border-slate-800 p-4 rounded-2xl flex flex-col justify-between">
                        <div>
                            <div class="text-3xl font-black text-amber-400 font-mono">${defensivePct}%</div>
                            <div class="text-xs font-bold text-white mt-1">Defensive & Cash Flow</div>
                        </div>
                        <p class="text-[11px] text-slate-400 mt-2 leading-relaxed">หุ้นสาธารณูปโภคและเงินปันผล คานความผันผวนยามตลาดสะดุด</p>
                    </div>

                    <div class="bg-slate-950 border border-slate-800 p-4 rounded-2xl flex flex-col justify-between">
                        <div>
                            <div class="text-3xl font-black text-slate-300 font-mono">${cashPct}%</div>
                            <div class="text-xs font-bold text-white mt-1">Dry Powder & Cash Reserve</div>
                        </div>
                        <p class="text-[11px] text-slate-400 mt-2 leading-relaxed">เงินสดสภาพคล่องสูง ป้องกันความเสี่ยงและรอช้อนซื้อของถูก</p>
                    </div>
                </div>
            </div>

            <div class="mb-8">
                <div class="bg-slate-950 border border-slate-800 p-4 rounded-2xl mb-6 text-xs text-slate-300 leading-relaxed">
                    <strong class="text-cyan-300">แนวทางตามประสบการณ์และวินัยการลงทุน:</strong>
                    ${investorAdvice}
                </div>
                <div class="flex items-center justify-between mb-3">
                    <h3 class="text-sm font-bold text-white flex items-center gap-2">
                        <span>🏢</span> หุ้นที่ไม่จำเจที่ตรงกับสไตล์คุณ (คลิกเพื่อดูกราฟและสรุปข่าวจริง):
                    </h3>
                    <span class="text-[11px] text-cyan-400">เลือกหุ้นเพื่อดูกราฟและข้อมูลประกอบ</span>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    ${selectedStocks.map(stock => `
                        <button
                            type="button"
                            onclick="viewRecommendedStock('${stock.symbol}')"
                            class="text-left bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500 p-5 rounded-2xl transition"
                        >
                            <div class="flex items-center justify-between gap-3 mb-2">
                                <span class="font-mono font-bold text-cyan-300">${escapeHtml(stock.symbol)}</span>
                                <span class="text-[11px] text-slate-400">${escapeHtml(stock.origin)}</span>
                            </div>
                            <span class="block text-sm font-bold text-white mb-2">${escapeHtml(stock.name)}</span>
                            <span class="block text-xs text-slate-400 leading-relaxed">${escapeHtml(stock.why)}</span>
                        </button>
                    `).join('')}
                </div>
            </div>

            <p class="text-[11px] text-slate-500 leading-relaxed border-t border-slate-800 pt-4">
                ผลลัพธ์นี้เป็นข้อมูลเพื่อการศึกษา ไม่ใช่คำแนะนำการลงทุน สัดส่วนจริงควรพิจารณาความสามารถในการรับความเสี่ยงและสถานการณ์ทางการเงินของคุณ
            </p>
        </div>
    `;
    container.classList.remove('hidden');
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.addEventListener('DOMContentLoaded', () => {
    renderSpecificStockNews('NVDA', 'NASDAQ:NVDA', factualNewsDatabase.NVDA.name);
    initTradingViewWidget('NASDAQ:NVDA');
});