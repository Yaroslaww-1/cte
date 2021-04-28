import BoldIcon from '../../assets/images/bold.svg';

export default {
	title: 'bold',
	description: 'Bold',
	IconComponent: BoldIcon,
	onClickAction(): void {
		document.execCommand('bold', false, '');
	},
};
