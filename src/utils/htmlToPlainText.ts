export const htmlToPlainText = (htmlString: string) => htmlString.replace(/<(.|\n)*?>/g, '')