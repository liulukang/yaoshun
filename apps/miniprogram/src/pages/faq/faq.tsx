import { Button, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import Header from '../../components/Header'
import { faqs } from '../../data/content'

export default function Faq() {
  const [open, setOpen] = useState(0)
  return <View className='page'><Header subtitle='HELP CENTER' action='联系我们' actionUrl='/pages/contact/contact' /><View className='intro container'><View className='intro-kicker'>HELP CENTER</View><View className='intro-title'>陪你把每一次搭建玩好</View><View className='intro-text'>关于年龄、玩法、收纳和安全的小问题，都可以在这里找到答案。</View></View><View className='guide-grid container'>{[['选购建议', '从 69 件或 100 件套装开始，先熟悉拼搭和收纳。', '01'], ['安全提醒', '请在成人陪同下，在平整开阔的空间里搭建。', '02'], ['收纳方法', '按杆件、连接球和小配件分类，下次更快找到。', '03']].map((item) => <View className='guide-card card' key={item[0]}><View className='guide-number'>{item[2]}</View><View className='guide-title'>{item[0]}</View><View className='guide-text'>{item[1]}</View></View>)}</View><View className='faq-list container'>{faqs.map((item: any, index: number) => <View className={`faq-item card ${open === index ? 'open' : ''}`} key={item.q} onClick={() => setOpen(open === index ? -1 : index)}><View className='faq-question'><Text>{item.q}</Text><Text className='faq-toggle'>{open === index ? '−' : '+'}</Text></View>{open === index ? <View className='faq-answer'>{item.a}</View> : null}</View>)}</View><View className='section faq-bottom'><View className='faq-bottom-card'><View className='faq-bottom-title'>还没找到答案？</View><View className='faq-bottom-text'>可以直接查看公司的电话、邮箱和地址。</View><Button className='primary-btn' onClick={() => Taro.navigateTo({ url: '/pages/contact/contact' })}>查看联系方式 <Text>→</Text></Button></View></View></View>
}
