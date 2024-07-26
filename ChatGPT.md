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

---

> I want to unit test FontAwesomeService. How to mock @fortawesome libs?
> `FontAwesomeService code`

---

> I need to unit test a hook, that uses react-responsive. How to do it?
> I tried to write a unit test but it throws TypeError: Cannot read properties of null (reading 'useContext').
>
> ```js
> import useMobileScreenCheck from '.';
> const screenWidths = [
> 	{
> 		screenWidth: 600,
> 		isMobile: false
> 	},
> 	{
> 		screenWidth: 500,
> 		isMobile: true
> 	}
> ];
> describe('useMobileScreenCheck', () => {
> 	describe.each(screenWidths)('test for width $screenWidth', (item) => {
> 		window.innerWidth = item.screenWidth;
> 		it(returns ${item.isMobile}, () => {
> 			expect(useMobileScreenCheck()).toBe(item.isMobile);
> 		});
> 	});
> });
> ```
