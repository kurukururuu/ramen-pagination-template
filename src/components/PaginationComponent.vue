<template>
	<div>
		<div class="row pagination align-center">
			<!-- prev button -->
			<a
				v-if="data.meta"
				:class="'pagination navigation ' + (currentPage === 1 || data.meta.pagination.count == 0 ? '' : 'visible')"
				@click="actionPrevious(currentPage)"
				>
				<span v-if="textNav">{{ prevText }}</span>
				<span v-else>&lt;</span>
			</a>

			<!-- numbers -->
			<div v-if="data.meta">
				<div v-if="data.meta.pagination.total_pages > 1">
					<div v-if="data.meta.pagination.total_pages > 5">
						<div class="row align-center">
							<a
								v-if="currentPage > 3"
								:class="'pagination'"
								:title="1"
								@click="goToPage"
								>
								{{ firstText }}
							</a>
							<div v-if="currentPage > 3">
								<span class="dot">. . .</span>
							</div>
							<a
								v-for="(i, index) in paginationTemplate"
								:key="index"
								:class="currentPage === paginationTemplate[index] ? 'active' : 'not-active'"
								:disabled="currentPage === paginationTemplate[index] ? true : false"
								@click="goToPage"
								:title="paginationTemplate[index]"
								>
								{{ paginationTemplate[index] }}
							</a>

							<div v-if="currentPage < data.meta.pagination.total_pages-2">
								<span class="dot">. . .</span>
							</div>

							<a
								v-if="currentPage < data.meta.pagination.total_pages-2"
								:class="'pagination'"
								:title="data.meta.pagination.total_pages"
								@click="goToPage"
								>
								{{ lastText }}
							</a>
						</div>
					</div>
					
					<!-- if total pages < 5 -->
					<div v-else>
						<a
							v-for="(i, index) in paginationTemplate"
							:key="index"
							:title="paginationTemplate[index]"
							:class="currentPage == paginationTemplate[index] ? 'active' : 'not-active'"
							:disabled="currentPage === paginationTemplate[index] ? true : false"
							@click="goToPage"
							>
							{{ paginationTemplate[index] }}
						</a>
					</div>
				</div>
			</div>

			<!-- next button -->
			<a
				v-if="data.meta"
				:class="'pagination navigation ' + (currentPage === data.meta.pagination.total_pages || data.meta.pagination.count == 0 ? '' : 'visible')"
				@click="actionNext(currentPage, data.meta.pagination.total_pages)"
				>
				<span v-if="textNav">{{ nextText }}</span>
				<span v-else>&gt;</span>
			</a>
		</div>
		<br>
		<div v-if="!data.meta">{{ emptyText }}</div>
	</div>
</template>

<script>
export default {
	props: {
		data: {
			type: Object,
			default() {
				return {
					data: {},
					meta: {}
				}
			}
		},
		textNav: {
			type: Boolean,
			default() {
				return false
			}
		},
		firstText: {
			type: String,
			default() {
				return 'First Page'
			}
		},
		lastText: {
			type: String,
			default() {
				return 'Last Page'
			}
		},
		prevText: {
			type: String,
			default() {
				return 'Previous'
			}
		},
		nextText: {
			type: String,
			default() {
				return 'Next'
			}
		},
		emptyText: {
			type: String,
			default() {
				return 'No Data Available'
			}
		},
	},
	computed: {
		currentPage() {
			return this.data.meta.pagination.current_page || 1
		},
		paginationTemplate() {
			const arr = []
			const meta = this.data.meta
			const b = this.currentPage
			if (meta.pagination) {
				if (meta.pagination.total_pages < 6) {
					for (let i = 0; i < 5; i++) {
						if (i < meta.pagination.total_pages) {
							arr.push(i + 1)
						}
					}
				} else if (b < 3) {
					for (let i = 0; i < 5; i++) {
						if (i <= meta.pagination.total_pages) {
							arr.push(i + 1)
						}
					}
				} else { // exp: b=10, total_pages = 10
					let temp = b - 2 // temp = 8
					for (let i = 0; i < 5; i++) {
						if (temp <= meta.pagination.total_pages) { // 8 < 10 true
							arr.push(b + (i - 2))
							temp++
						}
					}
				}
			}
			return arr
		}
	},
	mounted() {
	},
	methods: {
		actionPrevious() {
			// this.currentPage--
			this.$emit('pageChanged', { action: 'previous', page_destination: this.currentPage - 1 })
		},
		actionNext() {
			// this.currentPage++
			this.$emit('pageChanged', { action: 'next', page_destination: this.currentPage + 1 })
		},
		goToPage(e) {
			let temp = e.target.title
			if (temp !== this.currentPage) {
				this.$emit('pageChanged', { action: 'page-changed', page_destination: Number(temp) })
			}
		}
	}
}
</script>

<style lang="scss" scoped>
	.pagination {
		a {
			text-align: center;
			color: black;
			background-color: white;
			border: solid 0.5px #333;
			border-radius: 5px;
			padding: 7px 13px;
			text-decoration: none;
			transition: background-color .3s;
			margin: 4px;
			&.active {
				background-color: #333;
				color: white;
				border-radius: 5px;
				cursor: auto;
			}
			&:hover:not(.active) {
				background-color: #F4F5F7;
				color: black;
				border-radius: 5px;
				cursor: pointer;
			}
		}
	}
	.navigation {
		display: none;
		&.visible {
			display: block;
		}
	}
	.dot {
		text-align: center;
		color: black;
		/* background-color: #bbbbbb; */
		border-radius: 5px;
		padding: 7px 8px;
		text-decoration: none;
		transition: background-color .3s;
		margin: 4px;
	}

	#mobile {
		display: none;
	}
	// responsive
	@media (min-width: 0px) and (max-width: 768px) { // small-large phone (xs)
		#mobile {
			display: block;
			min-width: 200px;
		}
		#desktop {
			display: none;
		}
	}
	@media (min-width: 769px) and (max-width: 1023px) { // tablet  (xs)
	}
	@media (min-width: 1024px) and (max-width: 1215px) { // desktop (xs)
	}
	@media (min-width: 1216px) and (max-width: 1407px) { // widescreen (xs)
	}
	@media (min-width: 1408px) { // Full HD (xs)
	}
</style>
