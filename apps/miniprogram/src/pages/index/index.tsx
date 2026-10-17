import { Button, Image, Navigator, ScrollView, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import Header from '../../components/Header'
import ProductCard from '../../components/ProductCard'
import SectionTitle from '../../components/SectionTitle'
import { featuredProducts } from '../../data/products'
import { images } from '../../data/assets'

const quickLinks = [
  { label: '入门搭建', query: '3岁+' }, { label: '夜光探险', query: '夜光' },
  { label: '亲子共搭', query: '亲子' }, { label: '多人挑战', query: '多人' }
]

export default function Index() {
  const goProducts = () => Taro.switchTab({ url: '/pages/products/products' })
  const goPlay = () => Taro.switchTab({ url: '/pages/play/play' })
  return <View className='page'>
    <Header subtitle='PLAY HOME' action='联系我们' actionUrl='/pages/contact/contact' />
    <View className='hero container'><Image className='hero-background' src={images.homeHero} mode='aspectFill' /><View className='hero-shade' /><View className='hero-copy'><Text className='hero-kicker'>LONDY · 一起搭，一起玩</Text><Text className='hero-title'>把客厅变成孩子的</Text><Text className='hero-title hero-title-accent'>想象游乐场</Text><Text className='hero-text'>一根杆、一颗球，和孩子一起搭出城堡、帐篷与秘密基地。</Text><View className='hero-actions'><Button className='primary-btn hero-btn' onClick={goProducts}>挑一套玩具 <Text>→</Text></Button><Button className='hero-link' onClick={goPlay}>看搭建灵感 <Text>›</Text></Button></View></View></View>
    <View className='section quick-section'><SectionTitle title='今天，想搭什么？' subtitle='按年龄和玩法，找到适合孩子的第一套' /><View className='quick-grid'>{quickLinks.map((item, index) => <View className='quick-card card' key={item.query} onClick={() => { Taro.setStorageSync('productsFilter', item.query); Taro.switchTab({ url: '/pages/products/products' }) }}><View className='quick-dot'>{index + 1}</View><View className='quick-label'>{item.label}</View><View className='quick-arrow'>›</View></View>)}</View></View>
    <View className='section product-section'><SectionTitle title='孩子的第一套创作工具' subtitle='从官网主推套装中精选 7 款，按家庭场景开始挑选' action='查看全部 ›' onAction={goProducts} /><ScrollView className='product-scroll' scrollX showScrollbar={false}><View className='product-rail'>{featuredProducts.slice(0, 4).map((item) => <View className='product-rail-item' key={item.id}><ProductCard product={item} /></View>)}</View></ScrollView></View>
    <View className='section play-section'><View className='play-card card'><Image className='play-image' src={images.tentScene} mode='aspectFill' /><View className='play-copy'><Text className='pill pill-yellow'>PLAY IDEAS</Text><View className='play-title'>同一套玩具，每天都有新玩法</View><View className='play-text'>今天是帐篷，明天是城堡。先搭起来，再让故事继续。</View><View className='play-link' onClick={goPlay}>进入拼搭屋 <Text>→</Text></View></View></View></View>
    <View className='section benefit-section'><SectionTitle title='玩得开心，也学会成长' subtitle='把想象、合作和动手能力，藏进每一次搭建里' /><View className='benefit-grid'>{[['✦', '自由想象', '没有固定答案，孩子自己决定怎么搭'], ['♡', '一起合作', '和家长、朋友分工，完成一座小基地'], ['⌂', '轻松收纳', '分类放回收纳袋，下次马上继续']].map((item) => <View className='benefit-card' key={item[1]}><View className='benefit-icon'>{item[0]}</View><View className='benefit-title'>{item[1]}</View><View className='benefit-text'>{item[2]}</View></View>)}</View></View>
    <View className='section parent-guide-section'><SectionTitle title='按家庭节奏来选' subtitle='官网的产品信息，整理成家长一眼能懂的搭建路线' /><View className='parent-guide-list'>{[['01', '第一次尝试', '69–100 件，先熟悉杆件、连接球和收纳'], ['02', '一起玩起来', '120–158 件，适合亲子分工和秘密基地'], ['03', '搭一座大空间', '168–228 件，适合多人协作和更大的城堡']].map((item) => <View className='parent-guide-row card' key={item[0]}><View className='parent-guide-number'>{item[0]}</View><View className='parent-guide-copy'><View className='parent-guide-title'>{item[1]}</View><View className='parent-guide-text'>{item[2]}</View></View><View className='parent-guide-arrow'>›</View></View>)}</View></View>
    <View className='section brand-section'><Image className='brand-image' src={images.brandScene} mode='aspectFill' /><View className='brand-shade' /><View className='brand-overlay'><Text className='pill pill-orange'>LONDY CARES</Text><View className='brand-title'>每件 LONDY，都从孩子的使用感受出发</View><View className='brand-text'>我们认真挑选材料，反复检查连接件，让孩子放心搭、放心玩。</View><View className='brand-link' onClick={() => Taro.switchTab({ url: '/pages/brand/brand' })}>了解 LONDY <Text>→</Text></View></View></View>
  </View>
}
