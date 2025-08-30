const CoreFrontline = extend(CoreBlock, "前线指挥中心", {
    canBreak(tile) { return Vars.state.teams.cores(tile.team()).size > 1; },
    canReplace(other) { return other.alwaysReplace; },
    canPlaceOn(tile, team) { return Vars.state.teams.cores(team).size < 8;
    },
});
