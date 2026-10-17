import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'

type Props = { subtitle: string; action?: string; actionUrl?: string }

export default function Header({ subtitle, action, actionUrl }: Props) {
  const onAction = () => {
    if (!actionUrl) return
    const path = actionUrl.split('?')[0]
    const tabPages = ['/pages/index/index', '/pages/products/products', '/pages/play/play', '/pages/brand/brand', '/pages/faq/faq']
    if (tabPages.includes(path)) {
      Taro.switchTab({ url: path })
    } else {
      Taro.navigateTo({ url: actionUrl })
    }
  }
  return <View className='topbar'>
    <View className='brand'><View className='brand-logo'>L</View><View><View className='brand-name'>LONDY</View><View className='brand-sub'>{subtitle}</View></View></View>
    {action ? <Text className='top-action' onClick={onAction}>{action}</Text> : null}
  </View>
}
