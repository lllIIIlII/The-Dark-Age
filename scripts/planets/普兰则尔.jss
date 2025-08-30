const HJlib = require("base/HJlib");
const PLZE = new Planet("普兰则尔", Planets.sun, 1, 3.3);
PLZE.meshLoader = prov(() => new HexMesh(PLZE, 6)); // 里面的最好别超过9

function color(c) {
    return Color.valueOf(c);
}

/*const sS = require("sectorSize");
sS.planetGrid(PLZE, 3);*/

PLZE.generator = new SerpuloPlanetGenerator();
PLZE.generator = extend(SerpuloPlanetGenerator, {
    arr: [
        color("000000FF"), color("000000FF"), color("000000FF"),
        color("A3DB88FF"), color("A3DB88FF"), color("A3DB88FF"),
        color("A3DB88FF"), color("A3DB88FF"), color("8DA3F8FF"),
        color("8DA3F8FF"), color("8DA3F8FF"), color("8DA3F8FF"),
        color("8DA3F8FF"), color("000000FF"), color("000000FF")
    ], // 颜色不要过多，不然就是一坨
    
    getColor(position) {
        const noise = (amount, a, b, c) => {
            var n = Simplex.noise3d(this.seed + amount, a, b, c, position.x, position.y, position.z);
            return n;
        };
        
        this.vec = new Vec3(
            noise(188, 0.9, 0, 0.5 / 0.6),
            noise(276, 0.8, 0.17, 0.3 / 0.7),
            noise(99, 0.3, 4.3, 0.1 / 0.3)
        ); // 对应数据噪点（种子？,色块分散度,？,色块分散度，比值越大越分散）
        
        var amo = Mathf.round(Mathf.clamp(this.vec.x * this.arr.length, 0, this.arr.length - 1));
        return Tmp.c1.set(this.arr[amo]);
    },
    
    getDefaultLoadout() {
        return Schematics.readBase64("bXNjaAF4nGNgYmBiZmDJS8xNZWB7tmDH0/3NDNwpqcXJRZkFJZn5eQwMDGw5iUmpOcUMTNGxjAwyz2bMfz6151nfoudbFulCqBcNrU/n73q+eiZQMSMDBAAAdBEhZg==");
    },
    
    allowLanding(sector) {
        return false; // 是否启用数字区块
    }
});

PLZE.cloudMeshLoader = prov(() => new MultiMesh(
    new HexSkyMesh(PLZE, 2, 0.3, 0.13, 5, Color.valueOf("45454550"), 2, 0.42, 1, 0.43),
    new HexSkyMesh(PLZE, 2.5, 0.15, 0.14, 5, Color.valueOf("000000C0"), 2, 0.42, 1, 0.4),
    new HexSkyMesh(PLZE, 3, 0.6, 0.15, 5, Color.valueOf("30303070"), 2, 0.42, 1.2, 0.45)
));

PLZE.bloom = false; // 不清楚
PLZE.accessible = true; // 是否在行星菜单内显示
PLZE.rotateTime = 1800; // 一昼夜的时间(s)
PLZE.localizedName = "普兰则尔"; // 左上角的名字
PLZE.visible = true; // 可见
PLZE.atmosphereRadIn = 0.02; // 进入大气层距离
PLZE.atmosphereRadOut = 0.26; // 离开大气层距离
PLZE.alwaysUnlocked = true;
// PLZE.showRtsAIRule = true;
PLZE.prebuildBase = false;
PLZE.orbitRadius = 90; // 星球公转半径
PLZE.atmosphereColor = PLZE.lightColor = Color.valueOf("2C5F5C"); // 大气层/发光颜色
PLZE.atmosphereRadIn = 0.007; // 大气素
PLZE.atmosphereRadOut = 0.15; // 大气输出
PLZE.defaultEnv = Env.spores | Env.terrestrial; // 环境
PLZE.startSector = 154; // 默认解锁的区块编号
PLZE.iconColor = Color.valueOf("46FFF9"); // 星球图标颜色
PLZE.clearSectorOnLose = true; // 失败是否重置区域存档
exports.PLZE = PLZE;

// Sector Presets
const map1tb = new SectorPreset("同步轨道空间站", PLZE, 154);
map1tb.description = "敌军入侵后的指挥部，现已沦为废墟。来自赛普罗的支援军选择降落在这。发展后勤，等待指挥部的指示。\n[red]难度等级：6";
map1tb.difficulty = 2;
map1tb.alwaysUnlocked = false;
map1tb.addStartingItems = true;
map1tb.captureWave = 80;
map1tb.localizedName = "同步轨道空间站";
exports.map1tb = map1tb;
HJlib.addToResearch(map1tb, {
    parent: "planetaryTerminal",
    objectives: Seq.with(new Objectives.SectorComplete(SectorPresets.planetaryTerminal))
});

const map3xs = new SectorPreset("峡石涧", PLZE, 32);
map3xs.description = "峡石涧：位于地冠山脉南侧的原始森林中，矿产资源还算丰富。指挥部让我们清剿周围天灾，与地冠山脉中心的埃里克尔支援军汇合。\n[red]难度等级：5";
map3xs.difficulty = 1;
map3xs.alwaysUnlocked = false;
map3xs.addStartingItems = true;
map3xs.captureWave = 65;
map3xs.localizedName = "峡石涧";
exports.map3xs = map3xs;
HJlib.addToResearch(map3xs, {
    parent: "同步轨道空间站", objectives: Seq.with(new Objectives.SectorComplete(map1tb))
});

const map4dg = new SectorPreset("地冠", PLZE, 177);
map4dg.description = "地冠，即地冠山脉的中心，此处油类物质极为丰富，故有大地之皇冠之称。不过周围有天灾的大型空军基地，埃里克尔的支援军选择了在这落脚，将配合你夺下地冠。\n[red]难度等级：17";
map4dg.difficulty = 4;
map4dg.alwaysUnlocked = false;
map4dg.addStartingItems = true;
map4dg.captureWave = 115;
map4dg.localizedName = "地冠";
exports.map4dg = map4dg;
HJlib.addToResearch(map4dg, {
    parent: "峡石涧",
    objectives: Seq.with(new Objectives.SectorComplete(map3xs))
});

const map5yy = new SectorPreset("云月关", PLZE, 178);
map5yy.description = "云月关：前往冥迷沙漠的必经之地，是一道天然关口。此地矿物质稀少，但地质运动较为活跃。利用矿渣，提取矿物质。\n天灾军团正在部署防线，务必抓紧时间，突破关口。\n[red]难度等级：11";
map5yy.difficulty = 3;
map5yy.alwaysUnlocked = false;
map5yy.addStartingItems = true;
map5yy.captureWave = 0;
map5yy.localizedName = "云月关";
exports.map5yy = map5yy;
HJlib.addToResearch(map5yy, {
    parent: "地冠",
    objectives: Seq.with(new Objectives.SectorComplete(map4dg))
});

const map6zs = new SectorPreset("[yellow]战术训练-速建防线", PLZE, 155);
map6zs.description = "战术训练-速建防线\n有限的时间里也能建造出强大的防线\n[red]难度等级：15";
map6zs.difficulty = 4;
map6zs.alwaysUnlocked = false;
map6zs.addStartingItems = true;
map6zs.captureWave = 11;
map6zs.localizedName = "[yellow]战术训练-速建防线";
exports.map6zs = map6zs;
HJlib.addToResearch(map6zs, {
    parent: "地冠",
    objectives: Seq.with(new Objectives.SectorComplete(map4dg))
});

const map7tx = new SectorPreset("铁线三角洲", PLZE, 12);
map7tx.description = "这里曾是普兰则尔大陆的经济发达区，天灾入侵后的重灾区。\n三角洲地形，越靠近海的土地越年轻，地形平坦，矿产稀少，有城市遗迹。\n[grey]其他信息缺失，需要进行采集\n[red]难度等级:13?";
map7tx.difficulty = 3;
map7tx.alwaysUnlocked = false;
map7tx.addStartingItems = true;
map7tx.captureWave = 105;
map7tx.localizedName = "铁线三角洲";
exports.map7tx = map7tx;
HJlib.addToResearch(map7tx, {
    parent: "地冠",
    objectives: Seq.with(new Objectives.SectorComplete(map4dg))
});

const map8 = new SectorPreset("[yellow]战术训练-防空网", PLZE, 96);
map8.description = "此处为冥迷沙漠的西南部，矿物较少\n战术训练-防空网\n拦截那些飞机，别让它们偷核心了\n[red]难度等级:17";
map8.difficulty = 4;
map8.alwaysUnlocked = false;
map8.addStartingItems = true;
map8.captureWave = 10;
map8.localizedName = "[yellow]战术训练-防空网";
exports.map8 = map8;
HJlib.addToResearch(map8, {
    parent: "[yellow]战术训练-速建防线",
    objectives: Seq.with(new Objectives.SectorComplete(map6zs))
});

const map9 = new SectorPreset("冥迷沙漠西部", PLZE, 36);
map9.description = "冥迷沙漠：普兰大陆中部的大沙漠，位于地冠山脉北部，游云高原南部。冥迷沙漠的铀矿储存十分丰富，是一定要争夺的地区之一。不过沙漠里其他矿物储量很少，建议使用单位进行防守。\n云月关被攻破的消息天灾军团已经知晓了，过不了多久冥迷沙漠就会陷入一片混乱。\n\n这里是为数不多矿物储量较为丰富的区域，在混乱开始之前，先把基础的后勤建起来吧。\n[red]难度等级：11";
map9.difficulty = 3;
map9.alwaysUnlocked = false;
map9.addStartingItems = true;
map9.captureWave = 55;
map9.localizedName = "冥迷沙漠西部";
exports.map9 = map9;
HJlib.addToResearch(map9, {
    parent: "云月关",
    objectives: Seq.with(new Objectives.SectorComplete(map5yy))
});

const map10 = new SectorPreset("染湖北畔", PLZE, 171);
map10.description = "染湖：冥迷沙漠中心的巨大湖泊，含盐量极高。不过工业用水不需要考虑含盐量，拿下这个区块，为后勤组提供珍贵的水资源。\n[red]难度等级：13";
map10.difficulty = 3;
map10.alwaysUnlocked = false;
map10.addStartingItems = true;
map10.captureWave = 0;
map10.localizedName = "染湖北畔";
exports.map10 = map10;
HJlib.addToResearch(map10, {
    parent: "冥迷沙漠西部",
    objectives: Seq.with(new Objectives.SectorComplete(map9))
});

const map11 = new SectorPreset("出云要塞", PLZE, 63);
map11.description = "天灾的一座要塞横在了前往游云山脉的路上，想要继续北上，寻找暗能爆发的源头，必须摧毁此要塞\n[gold]天灾的防守密不透风，试着找到要塞缺少的东西，运用合适的单位摧毁它\n[green]埃里克尔方面会提供一些支援\n[red]难度等级：21";
map11.difficulty = 5;
map11.alwaysUnlocked = false;
map11.addStartingItems = true;
map11.captureWave = 0;
map11.localizedName = "出云要塞";
exports.map11 = map11;
HJlib.addToResearch(map11, {
    parent: "染湖北畔",
    objectives: Seq.with(new Objectives.SectorComplete(map10))
});

const map12 = new SectorPreset("[yellow]战术训练-物资管理", PLZE, 91);
map12.description = "管理资源，是每个工程师必修的内容\n[red]难度等级：4";
map12.difficulty = 1;
map12.alwaysUnlocked = false;
map12.addStartingItems = true;
map12.captureWave = 6;
map12.localizedName = "[yellow]战术训练-物资管理";
exports.map12 = map12;
HJlib.addToResearch(map12, {
    parent: "[yellow]战术训练-防空网",
    objectives: Seq.with(new Objectives.SectorComplete(map8))
});

const map13 = new SectorPreset("[#EE8066]沉云盆地", PLZE, 180);
map13.description = "[pink]设备不好的可以不打此战役\n\n[white]游云山脉北侧的巨大盆地，景色优美，但矿物资源少的可怜。中心处有一座湖泊，由于地形原因，战线被拉的特别长。更北边的基地已经被天灾淹没，你需要在大批的天灾来临之前加固你的防线。\n[gold]由于矿物资源稀少，后勤部将打开空间通道，为你提供物资\n[red]难度等级：无限火力!";
map13.difficulty = 7;
map13.alwaysUnlocked = false;
map13.addStartingItems = true;
map13.captureWave = 135;
map13.localizedName = "[#EE8066]沉云盆地";
exports.map13 = map13;
HJlib.addToResearch(map13, {
    parent: "出云要塞",
    objectives: Seq.with(new Objectives.SectorComplete(map11))
});

const map14 = new SectorPreset("北极星银滩", PLZE, 123);
map14.description = "普兰大陆的最北端，再往北将进入暗能重度侵蚀地带，我们的先遣部队已经将这里发展了一段时间，星银滩将成为我们踏入重度侵蚀地带的跳板。\n四周的天灾正在源源不断涌向这里，守住这里，等待主力部队的到来\n[red]难度等级：23";
map14.difficulty = 5;
map14.alwaysUnlocked = false;
map14.addStartingItems = true;
map14.captureWave = 95;
map14.localizedName = "北极星银滩";
exports.map14 = map14;
HJlib.addToResearch(map14, {
    parent: "出云要塞",
    objectives: Seq.with(new Objectives.SectorComplete(map11))
});

const map15 = new SectorPreset("[yellow]战术训练-极端情况", PLZE, 179);
map15.description = "即使在最困难的条件下也要生存下去，这是工程师必须拥有的精神\n[red]难度等级：15";
map15.difficulty = 4;
map15.alwaysUnlocked = false;
map15.addStartingItems = true;
map15.captureWave = 6;
map15.localizedName = "[yellow]战术训练-极端情况";
exports.map15 = map15;
HJlib.addToResearch(map15, {
    parent: "[yellow]战术训练-物资管理",
    objectives: Seq.with(new Objectives.SectorComplete(map12))
});

const map16 = new SectorPreset("[#EE8066]平行河谷", PLZE, 15);
map16.description = "位于冥迷沙漠东边的侵蚀河谷，是连接冥迷沙漠和碧海草原的重要通道。\n自从冥迷沙漠被我方夺取后，碧海草原的天灾们开始躁动不安，它们正大批涌向这里。\n尽力守住此地，为主力部队争取宝贵的时间\n[green]科研部为你提供了最新一代巨炮：[gold]超新星[white]\n[red]难度等级：无尽";
map16.difficulty = 0;
map16.alwaysUnlocked = false;
map16.addStartingItems = true;
map16.captureWave = 0;
map16.localizedName = "[#EE8066]平行河谷";
exports.map16 = map16;
HJlib.addToResearch(map16, {
    parent: "染湖北畔",
    objectives: Seq.with(new Objectives.SectorComplete(map10))
});

const map17 = new SectorPreset("侵蚀区-外围", PLZE, 122);
map17.description = "位于北极地区的侵蚀区，是普兰则尔暗能爆发的源头，想要拯救普兰则尔就必须把这里的暗能清扫干净\n外围的岛屿已经被天灾们改造成了防御重地，而我们要啃下这块硬骨头\n[red]难度等级：10";
map17.difficulty = 2;
map17.alwaysUnlocked = false;
map17.addStartingItems = true;
map17.captureWave = 0;
map17.localizedName = "侵蚀区-外围";
exports.map17 = map17;
HJlib.addToResearch(map17, {
    parent: "北极星银滩",
    objectives: Seq.with(new Objectives.SectorComplete(map14))
});

const map18 = new SectorPreset("[yellow]战术训练-极地作战", PLZE, 231);
map18.description = "为了更好适应侵蚀区的极地冰川环境，特意模拟了一场小型战役\n[gold]任务：在未知环境和规定的时间内清除地方基地\n[red]难度等级：27";
map18.difficulty = 8;
map18.alwaysUnlocked = false;
map18.addStartingItems = true;
map18.captureWave = 0;
map18.localizedName = "[yellow]战术训练-极地作战";
exports.map18 = map18;
HJlib.addToResearch(map18, {
    parent: "[yellow]战术训练-极端情况",
    objectives: Seq.with(new Objectives.SectorComplete(map15))
});

const map19 = new SectorPreset("突袭", PLZE, 225);
map19.description = "此地位于侵蚀区西边，气候寒冷，暗能浓度高。\n天灾的主力军已经被吸引至星银滩那边。\n工程院，普兰则尔，埃里克尔的军队将从这里对天灾的防御工事进行突袭。\n[green]机会难得，时间紧迫\n[red]难度等级：20";
map19.difficulty = 5;
map19.alwaysUnlocked = false;
map19.addStartingItems = true;
map19.captureWave = 0;
map19.localizedName = "突袭";
exports.map19 = map19;
HJlib.addToResearch(map19, {
    parent: "侵蚀区-外围",
    objectives: Seq.with(new Objectives.SectorComplete(map17))
});

const map20 = new SectorPreset("深入", PLZE, 66);
map20.description = "突破天灾的外围防御，进入侵蚀区的中心区域\n此处暗能干扰严重，空间异常，需要工程师配合后勤部才能开启支援通道\n好在通讯功能未受到干扰，没有检测到附近有大型天灾单位，外围仍有许多天灾冲击着我们的防线。\n时间紧迫，迅速消灭敌人，继续深入探索\n[red]难度等级：11";
map20.difficulty = 3;
map20.alwaysUnlocked = false;
map20.addStartingItems = true;
map20.captureWave = 60;
map20.localizedName = "深入";
exports.map20 = map20;
HJlib.addToResearch(map20, {
    parent: "突袭",
    objectives: Seq.with(new Objectives.SectorComplete(map19))
});

const map21 = new SectorPreset("清扫", PLZE, 226);
map21.description = "此处为侵蚀区中心处，三方互相配合来到了这里\n由于暗能浓度极高，空置域里会生长出暗能块\n清理掉它们，拯救这颗星球\n[gold]务必小心，这里危机四伏\n[red]难度等级：35";
map21.difficulty = 10;
map21.alwaysUnlocked = false;
map21.addStartingItems = true;
map21.captureWave = 201;
map21.localizedName = "清扫";
exports.map21 = map21;
HJlib.addToResearch(map21, {
    parent: "深入",
    objectives: Seq.with(new Objectives.SectorComplete(map20))
});

const map22 = new SectorPreset("侵蚀区-汇合", PLZE, 233);
map22.description = "在深入清扫部队进行任务的同时，大批天灾涌向了侵蚀区西北部的据点，也就是这里。\n3方防守军队将要在这里与大批天灾对战，为清扫部队争取时间\n[red]难度等级：42";
map22.difficulty = 11;
map22.alwaysUnlocked = false;
map22.addStartingItems = true;
map22.captureWave = 155;
map22.localizedName = "侵蚀区-汇合";
exports.map22 = map22;
HJlib.addToResearch(map22, {
    parent: "突袭",
    objectives: Seq.with(new Objectives.SectorComplete(map19))
});

const map23 = new SectorPreset("涯光岛", PLZE, 160);
map23.description = "[white]天际群岛中的最大岛屿，位于南半球的海洋中\n锁住了天灾从南半球进攻的路线\n在古早的一次海战中，这里被夷为平地\n[green]如今，我们要重新夺回这个岛屿\n[white]天灾们没有在岛上设防，我们从外围的天灾群中撕开一道口子，将以这个岛屿为防御阵地，干扰南半球的天灾反攻\n[red]难度等级：39";
map23.difficulty = 10;
map23.alwaysUnlocked = false;
map23.addStartingItems = true;
map23.captureWave = 165;
map23.localizedName = "涯光岛";
exports.map23 = map23;
HJlib.addToResearch(map23, {
    parent: "铁线三角洲",
    objectives: Seq.with(new Objectives.SectorComplete(map7tx))
});

const map24 = new SectorPreset("霍兰德山脉", PLZE, 90);
map24.description = "霍兰德山脉：横在前往普兰大陆西边高原的巨大山脉，铁资源极为丰富。由于山脉重重堆叠，空军在这里发挥不了太大优势。\n在大陆最西边，为数不多幸存的城市[卡佩]遭受了大规模的天灾袭击。[卡佩]作为我们前往火山的最前线，是万万不能陷落的。\n[green]先锋部队已经为我们开辟了道路，但山脉中埋伏着大量天灾单位，保护好你的部队，活着走出山脉。\n[gold]地形狭窄，务必小心应对\n[red]难度等级:35";
map24.difficulty = 9;
map24.alwaysUnlocked = false;
map24.addStartingItems = true;
map24.captureWave = 91;
map24.localizedName = "霍兰德山脉";
exports.map24 = map24;
HJlib.addToResearch(map24, {
    parent: "铁线三角洲", objectives: Seq.with(new Objectives.SectorComplete(map7tx))
});

const map25 = new SectorPreset("未知屏蔽区", PLZE, 158);
map25.description = "这里是涯光岛南面的一片海域，不知何种原因，以我们的探测装置，竟然探测不了这片海域。\n保险起见，指挥部决定派遣几只精英小队去探查此海域。\n外部信号完全被屏蔽，你只能靠自己了\n[red]难度等级：38";
map25.difficulty = 9;
map25.alwaysUnlocked = false;
map25.addStartingItems = true;
map25.captureWave = 0;
map25.localizedName = "未知屏蔽区";
exports.map25 = map25;
HJlib.addToResearch(map25, {
    parent: "涯光岛", objectives: Seq.with(new Objectives.SectorComplete(map23))
});

const map26 = new SectorPreset("[卡佩]", PLZE, 237);
map26.description = "位于普兰大陆最西边的城市，为数不多在东半球幸存的城市\n为了压制破碎火山的天灾，[卡佩]必须守住\n[yellow]战斗中你将面对敌方的高机械化部队，用单位消耗它们\n[red]难度等级：40";
map26.difficulty = 10;
map26.alwaysUnlocked = false;
map26.addStartingItems = true;
map26.captureWave = 35;
map26.localizedName = "[卡佩]";
exports.map26 = map26;
HJlib.addToResearch(map26, {
    parent: "霍兰德山脉", objectives: Seq.with(new Objectives.SectorComplete(map24))
});

const map27 = new SectorPreset("阿特拉斯火山", PLZE, 26);
map27.description = "位于碎裂焱海中的巨大火山，超15万米的海拔让它得名阿特拉斯火山，也称破碎火山。目前处于稳定状态。暗能喜欢待在温度较高的地方，因此火山口常常冒出大量的天灾单位。铲除这里的侵蚀区，彻底控制北半球。[red]难度等级：45";
map27.difficulty = 10;
map27.alwaysUnlocked = false;
map27.addStartingItems = true;
map27.captureWave = 150;
map27.localizedName = "阿特拉斯火山";
exports.map27 = map27;
HJlib.addToResearch(map27, {
    parent: "[卡佩]", objectives: Seq.with(new Objectives.SectorComplete(map26))
});