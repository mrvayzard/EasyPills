/**
 * Created by Vayzard on 31.05.2017.
 */
module.exports = {
    getCategory: function (codeATX)
    {
        switch (codeATX.substring(0, 3)) {
            case "A01":
                return "Стоматологічні препарати";
            case "A02":
                return "Препарати, що застосовуються при станах, пов'язаних з порушеннями кислотності";
            case "A03":
                return "Препарати для лікування функціональних порушень з боку шлунково-кишкового тракту";
            case "A04":
                return "Протиблювотні препарати";
            case "A05":
                return "Препарати для лікування захворювань печінки та жовчовивідних шляхів";
            case "A06":
                return "Проносні препарати";
            case "A07":
                return "Протидіарейні, кишково протизапальні та протимікробні препарати";
            case "A08":
                return "Препарати для лікування ожиріння";
            case "A09":
                return "Препарати, що сприяють травленню";
            case "A10":
                return "Препарати для лікування цукрового діабету";
            case "A11":
                return "Вітаміни";
            case "A12":
                return "Мінеральні добавки";
            case "A13":
                return "Тонізуючу препарати";
            case "A14":
                return "Анаболічні засоби для системного застосування";
            case "A15":
                return "Стимулятори апетиту";
            case "A16":
                return "Інші препарати для лікування захворювань шлунково-кишкового тракту і порушення обміну речовин";
            case "B01":
                return "Антикоагулянти";
            case "B02":
                return "Гемостатичні препарати";
            case "B03":
                return "Антианемічні препарати";
            case "B04":
                return "Плазмозаміщуючі і перфузійні розчини";
            case "B05":
                return "Гіполіпідемічні препарати";
            case "B06":
                return "Інші гематологічні препарати";
            case "C01":
                return "Препарати для лікування захворювань серця";
            case "C02":
                return "Антигіпертензивні препарати";
            case "C03":
                return "Діуретики";
            case "C04":
                return "Периферичні вазодилататори";
            case "C05":
                return "Ангіопротектори";
            case "C06":
                return "";
            case "C07":
                return "Бета-блокатори";
            case "C08":
                return "Блокатори кальцієвих каналів";
            case "C09":
                return "Препарати, що впливають на ренін-ангіотензинову систему";
            case "C10":
                return "Гіполіпідемічні препарати";
            case "D01":
                return "Протигрибкові препарати для лікування захворювань шкіри";
            case "D02":
                return "Препарати з пом'якшувальною і протекторною дією";
            case "D03":
                return "Препарати для лікування ран і виразок";
            case "D04":
                return "Препарати для лікування свербежу";
            case "D05":
                return "Препарати для лікування псоріазу";
            case "D06":
                return "Протимікробні препарати для лікування захворювань шкіри";
            case "D07":
                return "Кортикостероїди для лікування захворювань шкіри для зовнішнього застосування";
            case "D08":
                return "Антисептики та дезінфікуючі препарати";
            case "D09":
                return "Перев'язувальний матеріал";
            case "D10":
                return "Препарати для лікування вугрів";
            case "D11":
                return "Інші препарати для лікування захворювань шкіри";
            case "G01":
                return "Антисептики і протимікробні препарати для лікування гінекологічних захворювань";
            case "G02":
                return "Інші препарати для лікування гінекологічних захворювань";
            case "G03":
                return "Статеві гормони і модулятори статевої системи";
            case "G04":
                return "Препарати для лікування урологічних захворювань";
            case "H01":
                return "Гормони гіпоталамуса і гіпофіза та їх аналоги";
            case "H02":
                return "Кортикостероїди для системного застосування";
            case "H03":
                return "Препарати для лікування захворювань щитовидної залози";
            case "H04":
                return "Гормони підшлункової залози";
            case "H05":
                return "Препарати, що регулюють обмін кальцію";
            case "J01":
                return "Протимікробні препарати для системного застосування";
            case "J02":
                return "Протигрибкові препарати для системного застосування";
            case "J03":
                return "";
            case "J04":
                return "Препарати, активні щодо мікобактерій";
            case "J05":
                return "Противірусні препарати для системного застосування";
            case "J06":
                return "Імунні сироватки та імуноглобуліни";
            case "J07":
                return "Вакцини";
            case "L01":
                return "Протипухлинні препарати";
            case "L02":
                return "Протипухлинні гормональні препарати";
            case "L03":
                return "Імуностимулятори";
            case "L04":
                return "Імунодепресанти";
            case "M01":
                return "Протизапальні та протиревматичні препарати";
            case "M02":
                return "Препарати для зовнішнього застосування при больовому синдромі при захворюваннях кістково-м'язової системи";
            case "M03":
                return "Міорелаксанти";
            case "M04":
                return "Протиподагричні препарати";
            case "M05":
                return "Препарати для лікування захворювань кісток";
            case "M09":
                return "Інші препарати для лікування захворювань кістково-м'язової системи";
            case "N01":
                return "Анестетики";
            case "N02":
                return "Анальгетики";
            case "N03":
                return "Протиепілептичні препарати";
            case "N04":
                return "Протипаркінсонічні препарати";
            case "N05":
                return "Психолептики";
            case "N06":
                return "Психоаналептики";
            case "N07":
                return "Інші препарати для лікування захворювань нервової системи";
            case "P01":
                return "Протипротозойні препарати";
            case "P02":
                return "Протигельмінтні препарати";
            case "P03":
                return "Препарати для знищення ектопаразитів, інсектициди й репеленти";
            case "К01":
                return "Препарати для лікування захворювань носа";
            case "К02":
                return "Препарати для лікування захворювань горла";
            case "К03":
                return "Препарати для лікування бронхіальної астми";
            case "К04":
                return "Препарати, що застосовуються при кашлі та застудних захворюваннях";
            case "К06":
                return "Антигістамінні препарати для системного застосування";
            case "К07":
                return "Інші препарати для лікування захворювань органів дихання";
            case "S01":
                return "Препарати для лікування захворювань очей";
            case "S02":
                return "Препарати для лікування захворювань вуха";
            case "S03":
                return "Препарати для лікування захворювань очей і вуха";
            case "V01":
                return "Алергени";
            case "V03":
                return "Інші різні препарати";
            case "V04":
                return "Діагностичні препарати";
            case "V06":
                return "Препарати для харчування";
            case "V08":
                return "Контрастні речовини";
            case "V07":
                return "Інші нелікарняного засоби";
            case "V09":
                return "Радіофармацевтичні діагностичні засоби";
            case "V10":
                return "Радіофармацевтичні засоби";
            case "V20":
                return "Засоби хірурічної дисмургії";
            case "V54":
                return "В'яжучий засіб рослинного походження";
        }
    }
}