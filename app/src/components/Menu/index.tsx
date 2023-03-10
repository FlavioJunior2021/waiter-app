import { useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { Product } from "../../types/Product";
import { formatCurrency } from "../../utils/formatCurrency";
import { PlusCircle } from "../Icons/PlusCircle";
import { ProductModal } from "../ProductModal";
import { Text } from "../Text";


import {ProductContainer,
	ProductImage,
	ProductDetails,
	Separator,
	AddToCartButton
} from './styles';

type Props = {
	onAddToCart: (product: Product) => void;
	products: Product[];
}

export function Menu({onAddToCart, products}: Props) {

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [selectedProduct, setselectedProduct] = useState<null | Product>(null);


	function handleOpenModal(product: Product){
		setIsModalVisible(true);
		setselectedProduct(product)
	}

	return(
		<>
		<ProductModal
				visible={isModalVisible}
				onClose={() => setIsModalVisible(false)}
				product={selectedProduct}
				onAddToCart={onAddToCart}
		/>
		<FlatList
			style={{marginTop: 32}}
			contentContainerStyle={{paddingHorizontal: 24}}
			ItemSeparatorComponent={Separator}
			data={products}
			keyExtractor={product => product._id}
			renderItem={({item: product}) => (
				<ProductContainer onPress={() => handleOpenModal(product)}>
					<ProductImage source={{
							uri: `http://192.168.18.3:3001/uploads/${product.imagePath}`
						}}
					/>
					<ProductDetails>
						<Text weight="600">
							{product.name}
						</Text>
						<Text size={14} color="#666" style={{marginVertical: 8}}>
							{product.description}
						</Text>
						<Text size={14} color="#333" weight="600">
							{formatCurrency(product.price)}
						</Text>
					</ProductDetails>
					<AddToCartButton onPress={()=> onAddToCart(product)}>
						<PlusCircle />
					</AddToCartButton>
				</ProductContainer>
			)}
		/>
		</>
	);
}
