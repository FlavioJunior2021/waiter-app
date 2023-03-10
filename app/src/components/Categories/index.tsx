import { useState } from 'react';
import { FlatList } from 'react-native'

import { Category } from '../../types/Category';
import { Text } from '../Text';
import { CategoriesItem, Icon } from './styles';

type Props = {
	categories: Category[],
	onSelectCategory: (categoryId: string) => Promise<void>
}

export function Categories({categories, onSelectCategory}: Props) {

	const [selectedCategory, setSelectedCategory] = useState('');

	function handleSelectCategory(categoryId: string) {
		const category = selectedCategory === categoryId ? '' : categoryId;
		onSelectCategory(category);
		setSelectedCategory(category);
	};

	return (
		<FlatList
			showsHorizontalScrollIndicator={false}
			data={categories}
			horizontal
			contentContainerStyle={{ paddingRight: 24 }}
			keyExtractor={category => category._id}
			renderItem={({ item: category }) => {
				const isSelected = selectedCategory === category._id;
				return (
					<CategoriesItem onPress={() => handleSelectCategory(category._id)}>
						<Icon>
							<Text opacity={isSelected ? 1 : 0.5}>
								{category.icon}
							</Text>
						</Icon>
						<Text size={14} weight={'600'} opacity={isSelected ? 1 : 0.5}>
							{category.name}
						</Text>
					</CategoriesItem>
				)
			}}
		/>
	);
};
