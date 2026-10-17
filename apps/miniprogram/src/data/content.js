const { images } = require('./assets')
const img = (name) => ({
  'tent-scene.webp': images.tentScene,
  'play-castle.webp': images.play.castle,
  'play-tent.webp': images.play.tent,
  'play-space.webp': images.play.space,
  'play-tunnel.webp': images.play.tunnel,
  'play-rocket.webp': images.play.rocket,
  'play-reading.webp': images.play.reading,
  'play-dome.webp': images.play.dome,
  'play-pirate.webp': images.play.pirate
}[name])

const playIdeas = [
  { id: 'castle', title: '城堡', subtitle: '给想象力一座高塔', icon: '✦', image: img('play-castle.webp'), age: '4岁+', copy: '先搭四个角，再加上屋顶和旗子，孩子可以为城堡编一段自己的故事。', tips: ['先从底部框架开始', '用长杆做出高塔', '让孩子自己命名城堡'] },
  { id: 'tent', title: '帐篷', subtitle: '客厅里的秘密基地', icon: '⌂', image: img('play-tent.webp'), age: '3岁+', copy: '把客厅变成一个小空间，适合阅读、玩偶游戏和亲子聊天。', tips: ['选择平整的地面', '用毯子增加舒适感', '玩完后按颜色收纳'] },
  { id: 'space', title: '太空站', subtitle: '夜光里的探险任务', icon: '✧', image: img('play-space.webp'), age: '4岁+', copy: '先搭出开放结构，再和孩子一起设计一场太空救援任务。', tips: ['白天先完成结构', '关灯前确认空间安全', '用角色扮演延伸故事'] },
  { id: 'tunnel', title: '隧道', subtitle: '一起穿越想象世界', icon: '→', image: img('play-tunnel.webp'), age: '5岁+', copy: '连接两个空间，变成一条可以爬行、探索和躲猫猫的隧道。', tips: ['保持通道宽度', '避免压在家具边缘', '多人搭建时分工合作'] },
  { id: 'rocket', title: '火箭', subtitle: '倒数三秒，发射！', icon: '↑', image: img('play-rocket.webp'), age: '4岁+', copy: '把高塔和圆顶连接起来，孩子可以设计自己的驾驶舱和星际任务。', tips: ['先做稳固底座', '给每个舱室取名字', '留出安全进出口'] },
  { id: 'reading', title: '阅读角', subtitle: '安静的一小块空间', icon: '▱', image: img('play-reading.webp'), age: '3岁+', copy: '加上毯子和靠垫，搭一个可以读绘本、听故事的温柔角落。', tips: ['选择靠墙位置', '保持通风和光线', '玩完按颜色收纳'] },
  { id: 'dome', title: '圆顶屋', subtitle: '从平面走向立体', icon: '⌂', image: img('play-dome.webp'), age: '5岁+', copy: '用更多连接球做出圆顶和分区，适合兄弟姐妹一起规划空间。', tips: ['先数清需要的杆件', '两人一组对称搭建', '完成后检查连接处'] },
  { id: 'pirate', title: '海盗船', subtitle: '驶向想象的海', icon: '◇', image: img('play-pirate.webp'), age: '5岁+', copy: '把帐篷、旗子和角色故事放进同一艘船，开始一场家庭探险。', tips: ['用旗子标记船头', '设置船长和瞭望台', '避免在高处攀爬'] }
]

const faqs = [
  { q: '适合多大的孩子？', a: '不同套装适合年龄不同，产品详情页会标明建议年龄。首次尝试可以从 69 件或 100 件套装开始。' },
  { q: '一套玩具可以搭多少种造型？', a: '没有固定答案。根据杆件数量和连接方式，可以搭建城堡、帐篷、房屋、火箭、隧道和秘密基地。' },
  { q: '玩完之后如何收纳？', a: '建议先按杆件、连接球和小配件分类，再放入收纳袋。这样下次搭建时更容易找到需要的零件。' },
  { q: '可以多人一起玩吗？', a: '可以。100 件以上的套装更适合兄弟姐妹、朋友或家长一起搭建，建议在宽敞平整的区域使用。' },
  { q: '使用时需要注意什么？', a: '请在成人陪同下使用，避免在楼梯、窗边或尖锐家具附近搭建，不要将小配件放入口中。' },
  { q: '夜光杆要怎么使用？', a: '先让夜光杆在自然光或室内灯光下吸收一会儿光，再进入较暗的空间观察效果。关灯前请先确认搭建区域没有绊脚物。' },
  { q: '杆件和连接球怎么连接？', a: '把杆件插入连接球并轻轻旋转固定即可。拆卸时握住连接球和杆件靠近接口的位置，慢慢拔出，不要拉扯布料。' },
  { q: '第一次买多少件比较合适？', a: '69–100 件适合第一次尝试和小空间搭建；120–158 件适合亲子共搭；168–228 件适合多人协作和更大的城堡。' },
  { q: '可以在户外玩吗？', a: '可以在平整、干燥、远离车辆和水面的户外区域短时间使用。雨天或大风天气请收回室内，玩完后保持零件干燥。' },
  { q: '搭建玩具能帮助孩子学到什么？', a: '开放式搭建会让孩子练习空间思维、动手协调、顺序判断和合作表达。家长可以先问“你想搭什么”，再一起找出实现方法。' },
  { q: '布艺配件脏了怎么清洁？', a: '建议用湿布局部擦拭并自然晾干，避免长时间浸泡或使用强力漂白剂。杆件和连接球可用清水擦拭后彻底晾干。' },
  { q: '产品里的收纳袋有什么用？', a: '收纳袋可以把杆件、连接球、夹子和旗子集中放好。建议每次玩完按类别收回，下次打开就能马上开始。' }
]

module.exports = { playIdeas, faqs }
