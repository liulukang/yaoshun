import { Image, Navigator, Text, View } from '@tarojs/components'

export default function ProductCard({ product }: { product: any }) {
  return <Navigator className='product-card card' url={`/pages/product-detail/product-detail?id=${product.id}`}>
    <View className='product-image-wrap'><Image className='product-image' src={product.image} mode='aspectFit' /><Text className='product-badge'>{product.badge}</Text></View>
    <View className='product-body'><View className='product-name'>{product.shortName}</View><View className='product-meta'><Text>{product.pieces}</Text><Text className='dot'>·</Text><Text>{product.age}</Text></View><Text className='product-scene'>{product.scene}</Text></View>
  </Navigator>
}
