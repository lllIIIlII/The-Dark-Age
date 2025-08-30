const 超相 = extend(StatusEffect,"超相",{
    init(){
        this.affinity(溃解, (unit, result, time) => {
            unit.damagePierce(34000);
            unit.unapply(超相);
        });
    }
});

const 溃解 = extend(StatusEffect,"溃解",{
    init(){
        this.affinity(超相, (unit, result, time) => {
            unit.damagePierce(20000);
            unit.unapply(溃解);
        });
    }
});

const 保护 = extend(StatusEffect,"保护",{
    init(){
        this.affinity(破防, (unit, result, time) => {
            unit.unapply(保护);
        });
    }
});

const 破防 = extend(StatusEffect,"破防",{
    init(){
        this.affinity(保护, (unit, result, time) => {
            unit.unapply(破防);
        });
    }
});

const 警惕 = extend(StatusEffect,"警惕",{
    init(){
        this.affinity(疑惑, (unit, result, time) => {
            unit.unapply(警惕);
        });
    }
});

const 疑惑 = extend(StatusEffect,"疑惑",{
    init(){
        this.affinity(警惕, (unit, result, time) => {
            unit.unapply(疑惑);
        });
    }
});

const 空间混乱 = extend(StatusEffect,"空间混乱",{
    init(){
        this.affinity(神圣, (unit, result, time) => {
            unit.unapply(空间混乱);
        });
    }
});

const 神圣 = extend(StatusEffect,"神圣",{
    init(){
        this.affinity(空间混乱, (unit, result, time) => {
            unit.unapply(神圣);
        });
    }
});

const 轻盈 = extend(StatusEffect,"轻盈",{
    init(){
        this.affinity(延迟, (unit, result, time) => {
            unit.unapply(轻盈);
        });
    }
});

const 延迟 = extend(StatusEffect,"延迟",{
    init(){
        this.affinity(轻盈, (unit, result, time) => {
            unit.unapply(延迟);
        });
    }
});

const 生命提升 = extend(StatusEffect,"生命提升",{
    init(){
        this.affinity(致盲, (unit, result, time) => {
            unit.unapply(生命提升);
        });
    }
});

const 致盲 = extend(StatusEffect,"致盲",{
    init(){
        this.affinity(生命提升, (unit, result, time) => {
            unit.unapply(致盲);
        });
    }
});

const 修复 = extend(StatusEffect,"修复",{
    init(){
        this.affinity(污染, (unit, result, time) => {
            unit.unapply(修复);
        });
    }
});

const 污染 = extend(StatusEffect,"污染",{
    init(){
        this.affinity(修复, (unit, result, time) => {
            unit.unapply(污染);
        });
    }
});

const 虚弱 = extend(StatusEffect,"虚弱",{
    init(){
        this.affinity(虚弱, (unit, result, time) => {
            unit.unapply(修复);
        });
    }
});

const 伤害提升 = extend(StatusEffect,"伤害提升",{
    init(){
        this.affinity(伤害提升, (unit, result, time) => {
            unit.unapply(虚弱);
        });
    }
});