# ChatGPT used prompts

> I have a react-hook-form form, and I want to attach some kind of onwatch property so I can attach a button or a preview on top of that. How to do that?
>
> How can I access watchedValues outside of FormEditBookmark? I want to do something like `<FormEditBookmark onEdit={...} />`
>
> How to make conditional rendering depending on favicon.type field inside the FormEditBookmark?
>
> I don't have a submit button, and I want to add it outside FormEditBookmark. How to link them?

---

> Help with jest unit testing LocalStorageService:
>
> ```js
> class LocalStorageService {
> 	static get APP_DATA_KEY() {
> 		return 'app';
> 	}
>
> 	static getAppData() {
> 		return JSON.parse(localStorage.getItem(this.APP_DATA_KEY));
> 	}
>
> 	static setAppData(data) {
> 		localStorage.setItem(this.APP_DATA_KEY, JSON.stringify(data));
> 	}
>
> 	static clearAppData() {
> 		localStorage.removeItem(this.APP_DATA_KEY);
> 	}
> }
>
> export default LocalStorageService;
> ```
