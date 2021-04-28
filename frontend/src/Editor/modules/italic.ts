import ItalicIcon from '../../assets/images/italic.svg';

export default {
	title: 'italic',
	description: 'Italic',
	IconComponent: ItalicIcon,
	onClickAction(): void {
		document.execCommand('italic', false, '');
	},
};
