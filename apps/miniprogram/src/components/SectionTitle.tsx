import { View } from '@tarojs/components'

type Props = { title: string; subtitle?: string; action?: string; onAction?: () => void }

export default function SectionTitle({ title, subtitle, action, onAction }: Props) {
  return <View className='section-head'><View><View className='section-title'>{title}</View>{subtitle ? <View className='section-subtitle'>{subtitle}</View> : null}</View>{action ? <View className='section-link' onClick={onAction}>{action}</View> : null}</View>
}
