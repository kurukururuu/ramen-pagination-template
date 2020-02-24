<template>
  <div id="app">
		<div class="wrapper">
			<PaginationComponent
				:data="list"
				text-nav
				class="row content-centered"
				@pageChanged="paginationChanged"
				/>
		</div>
  </div>
</template>

<script>
import PaginationComponent from '../src'
import axios from 'axios'

export default {
  name: 'app',
  components: {
		PaginationComponent
	},
	data() {
		return {
			list: {}
		}
	},
	mounted() {
		this.fetchItems({limit:5})
	},
	methods: {
		async fetchItems(args) {
			let query = ''
			if (args) {
				query += '?orderBy=<created_at'
				if (args.page) {
					query += `&page=${args.page}`
				}
				if (args.limit) {
					query += `&limit=${args.limit}`
				}
			}
			let url = 'https://api.khubforjustice.org/api/publications' + query
			const result = await axios.get(url)

			this.list = result.data
			// console.log('res', result)
		},
		paginationChanged(e) {
			// console.log('page changed', e)
			this.fetchItems({page:e.page_destination, limit:5})
		}
	}
}
</script>

<style>
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  /* -webkit-font-smoothing: antialiased; */
  /* -moz-osx-font-smoothing: grayscale; */
  /* text-align: center; */
  /* color: #2c3e50; */
	margin-top: 60px;
}

.wrapper {
	/* width: 600px; */
	margin: 0 auto;
}
</style>