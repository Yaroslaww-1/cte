import svg from '../../assets/images/bold.svg';
export default {
	title: 'bold',
	description: 'Bold',
	icon: svg,
	onClickAction(): void {
		document.execCommand('bold', false, '');
	},
};
