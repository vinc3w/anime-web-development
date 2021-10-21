function SkeletonItems(Item, n=50, startingIndex) {

	const items = [];

	for (let i = 0; i < n; i++) {
		items.push(<Item key={startingIndex ? startingIndex + i : i} />);
	}

	return items;

}

export default SkeletonItems;