const Notice = ({notice}) => {
	if (notice == undefined) return;

	return (
		<div className={notice.type}>
			{notice.text}
		</div>
	)
}

export default Notice;
