MapResizeDialog.minSize = 16;
MapResizeDialog.maxSize = 2048;
Vars.renderer.minZoom = 0.1;
Vars.renderer.maxZoom = 100;
ControlPathfinder.showDebug = false;

Events.on(EventType.ClientLoadEvent, cons(e => {
    var dialogo = new BaseDialog("[white]黑暗纪元\nThe Dark Age");
    
    dialogo.buttons.button("@close", run(() => {
        dialogo.hide();
    })).size(210, 64);
    
    dialogo.cont.pane(table => {
        table.add(Core.bundle.get("mod.黑暗纪元.update")).left().labelAlign(Align.left).row();
        table.image(Core.atlas.find("logo")).left().size(600, 100).pad(3).row();
        
        table.add(Core.bundle.get("mod.黑暗纪元.precautions")).left().growX().wrap().pad(4).labelAlign(Align.left).row();
        table.add(Core.bundle.get("mod.黑暗纪元.log")).left().growX().wrap().width(580).maxWidth(580).pad(4).labelAlign(Align.left).row();
    }).grow().center().maxWidth(600);
    
    dialogo.cont.button("关注up\n[#00FFFF]Supernova-68", run(() => {
        Core.app.openURI("https://space.bilibili.com/1908743845?spm_id_from=333.1007.0.0");
    })).size(200, 70).pad(2);
    
    dialogo.show();
}));

require("HJitems");
require("HJliquids");
require("blocks/临时核心");
require("blocks/前线指挥中心");
require("status");
require("sectorSize");