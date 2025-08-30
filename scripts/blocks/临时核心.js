//感谢mod-饱和火力的临时核心代码
const CoreFrontline = extend(CoreBlock, "临时核心", {
	canBreak(tile) {
		return Vars.state.teams.cores(tile.team()).size > 1;
	},
	canReplace(other) {
		return other.alwaysReplace;
	},
	canPlaceOn(tile, team, rotation) {
		return Vars.state.teams.cores(team).size < 10;
	}
});

CoreFrontline.buildType = prov(() => {
	let kill = false, num = 1, time = 60 * num;
	return extend(CoreBlock.CoreBuild, CoreFrontline, {
		updateTile() {
			this.super$updateTile();
			if (Vars.state.teams.cores(this.team).size > 15) kill = true;
			if (kill) {
				if (!Vars.headless) {
					Vars.ui.showLabel("[red]警告：数据过多，即将过载    \n正在重启中央数据库    ", 0.015, this.x, this.y);
				}
				time--
				if (time == 0) {
					this.kill();
				}
			}
		},
		draw() {
			this.super$draw();
			Draw.z(Layer.effect);
			Lines.stroke(2, Color.valueOf("FF5B5B"));
			Draw.alpha(kill ? 1 : Vars.state.teams.cores(this.team).size > 14 ? 1 : 0);
			Lines.arc(this.x, this.y, 16, time * (6 / num) / 360, 90);
		}
	})
});