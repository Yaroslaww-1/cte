export type MessageConfig = {
	templatePath: string;
	letterSubject: string;
	payload: {
		confirmationLink: string;
	};
};
