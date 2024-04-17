<template>
	<div>
		<div class="img-cover relative">
			<div class="w-100 h-100 absolute">
				<NavBarComponent class="z-2"/>
				<div class="d-flex justify-content-center w-100 h-100 align-items-center">
					<div class="z-2">
						<div class="w-100 pb-4">
							<span class="text-white h1 z-2">Do you want a trip?</span>
						</div>
						<div class="w-100">
							<ButtonComponent name="Start" className="btn btn-outline-primary text-white border border-white"/>
						</div>
					</div>
				</div>
			</div>
			<img class="img-cover" src="@/assets/images/cover.jpg">
			<div class="overlay"></div>
		</div>
		<div class="container py-5">
			<slot name="body"></slot>
		</div>
		<FooterComponent/>
	</div>
</template>

<script type="text/javascript">
	import ButtonComponent from '@/components/common/ButtonComponent';
	import NavBarComponent from '@/components/navbar/NavBarComponent';
	import FooterComponent from '@/components/footer/FooterComponent';
	export default {
		name: 'LayoutGuest',
		components:{
			ButtonComponent,
			NavBarComponent,
			FooterComponent,
		}
	};
</script>