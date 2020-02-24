# ramen-pagination-template
Vue.js Pagination Component for [ordent/ramenrest](https://github.com/ordent/ramenrest) backend service.

## Installation
```
npm install ramen-pagination-template
```

## Usage
* Import directly on your template
```javascript
import PaginationComponent from 'ramen-pagination-template'
export default {
	// ...
	components: {
		PaginationComponent
	}
	// ...
}
```
* Use Nuxt.js plugin
```javascript
// '/plugin/RamenPaginationTemplate.js'
import Vue from 'vue'
import PaginationComponent from 'ramen-pagination-template';
Vue.use(PaginationComponent)
```

## Example Usage
```html
<!-- 'YourPage.vue' -->
<template>
	<PaginationComponent
		:data="list"
		text-nav
		@pagechanged="paginationChanged"
		/>
</template>
```

## Options
| Property Name 	|  Type  	|                        Description                       	|  Default 	|
|:-------------:	|:------:	|:--------------------------------------------------------:	|:--------:	|
| data        		| Object 	| required; {data: Object, meta: Object} from ramen-rest response	    	| none  |
| textNav     		| Boolean | navigation label. true for text-based, or false for symbol				  	| false |
| firstText     	| String 	| custom label for first page		                            | First Page 	|
| lastText  			| String 	| custom label for last page	                         			| Last Page 	|
| prevText    		| String 	| custom label for previous button                          | Previous   	|
| nextText    		| String 	| custom label for next button            									| Next	     	|
| emptyText 			| String 	| custom text when data is empty									         	| No Data Available	|

## Listeners
| Listener Name 	|  Type  	|                        Description                       	|  Default 	|
|:-------------:	|:------:	|:--------------------------------------------------------:	|:--------:	|
| pageChanged  		| function 	| handler function after page is changed. No default handler. Object passed to the listener are {action:'previous|next|page-changed',page_destination:Number(page)}	|   |

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## License
[MIT](https://choosealicense.com/licenses/mit/)