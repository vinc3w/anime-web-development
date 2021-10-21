function ListBoxSkeleton({ item }) {

	return (
		<div className="list-box-skeleton">
			<div className="rank"></div>
			<div className="title">
				<div className="item-img skeleton-loading"></div>
				<div className="content">
					<div className="title-a skeleton-loading"></div>
					<div className="info skeleton-loading"></div>
					<div className="info skeleton-loading"></div>
				</div>
			</div>
		</div>
	);
}

export default ListBoxSkeleton;