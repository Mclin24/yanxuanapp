import {Icon,Toast,Lazyload} from 'vant'
import TabBar from './components/tabs'
import Scroller from './components/Scroll'
import ItemList from './components/itemList'
import Header from './components/Header'
export default {
	install(Vue){
		Vue.use(Icon);
		Vue.use(Toast);
		//图片懒加载
		Vue.use(Lazyload);
		//声明全局组件
		Vue.component('navBar',TabBar);
		Vue.component(Scroller.name,Scroller);
		Vue.component(ItemList.name,ItemList);
		Vue.component(Header.name,Header);
	}
}