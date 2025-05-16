<script lang="ts" module>
	import Carousel from '../components/Carousel.svelte';
	import Albumboard from '../components/Albumboard.svelte';

	const HipHop = [
		{
			title: "My Beautiful Dark Twisted Fantasy",
			id: "5d6e21e1-deb5-428e-bb42-c2a567f3619b",
			img: "https://ia801506.us.archive.org/29/items/mbid-5c525a6a-0152-47b7-8bba-d67cf4b7b0cc/mbid-5c525a6a-0152-47b7-8bba-d67cf4b7b0cc-27752120677_thumb250.jpg"
		},
		{
			title: "To pimp a Butterfly",
			id: "d9103c72-3807-4378-9ce7-b6f3e8fdd547",
			img: "https://dn721607.ca.archive.org/0/items/mbid-7d2294a9-fde9-4496-8ded-18e7ea8b7e29/mbid-7d2294a9-fde9-4496-8ded-18e7ea8b7e29-40040680528_thumb250.jpg"
		},
		{
			title: "AT.LONG.LAST.A$AP",
			id: "10a526a7-9d24-463f-8c0b-16ac98027460",
			img: "https://ia601504.us.archive.org/22/items/mbid-7b032e4a-74d1-4be8-bcae-6a6dec6172a5/mbid-7b032e4a-74d1-4be8-bcae-6a6dec6172a5-26950870423_thumb250.jpg"
		},
		{
			title: "The Allegory",
			id: "6d3ed0d8-948f-4644-afd9-939dd00e11d7",
			img: "https://ia601703.us.archive.org/12/items/mbid-ba7dcfc7-7be1-4dc0-b28b-946689b13bfc/mbid-ba7dcfc7-7be1-4dc0-b28b-946689b13bfc-29038787681_thumb250.jpg"
		},
		{
			title: "I LAY DOWN MY LIFE FOR YOU",
			id: "1e9e8f2b-febc-4c81-b067-77e595b5d5ba",
			img: "https://ia800505.us.archive.org/2/items/mbid-023044f8-f3ac-45e8-a595-debc17179886/mbid-023044f8-f3ac-45e8-a595-debc17179886-39491120326_thumb250.jpg"
		},
		{
			title: "Mr. Morale & the Big Steppers",
			id: "6bd70eee-bd46-4738-851a-f50c19d8d6db",
			img: "https://dn721608.ca.archive.org/0/items/mbid-f1f9e89c-5e10-4c46-b1de-869ae10c122f/mbid-f1f9e89c-5e10-4c46-b1de-869ae10c122f-32685606886_thumb250.jpg"
		},
		{
			title: "Slime Season 3",
			id: "1e668b45-ce5b-4ccf-9b8e-4d8585ae550f",
			img: "https://ia601207.us.archive.org/24/items/mbid-fc8ad53e-ae61-4718-bb40-beb5a611e787/mbid-fc8ad53e-ae61-4718-bb40-beb5a611e787-13136573538_thumb250.jpg"
		},
		{
			title: "The Divine Feminine",
			id: "be55ffec-5312-4275-ab1f-d6504b19bd61",
			img: "https://ia800506.us.archive.org/25/items/mbid-a98fb1a5-6eb4-4ab8-a004-b446e8da4cfe/mbid-a98fb1a5-6eb4-4ab8-a004-b446e8da4cfe-14497713385_thumb250.jpg"
		}
	];

	const Bollywood = [
		{
			title: "Raanjhanaa",
			id: "22e383cb-407f-4341-a6f7-78fe1cfc312d",
			img: "https://ia804507.us.archive.org/19/items/mbid-a6a83093-af90-41ba-be09-1d2f498132a5/mbid-a6a83093-af90-41ba-be09-1d2f498132a5-29762539675_thumb250.jpg"
		},
		{
			title: "Hazaaron Khwaishein Aisi",
			id: "964a0ccd-6ce0-41ee-a0a3-0b3bac8f7753",
			img: "https://ia800507.us.archive.org/11/items/mbid-bad40905-37db-442c-a672-0c3f100f4b8b/mbid-bad40905-37db-442c-a672-0c3f100f4b8b-37173014486_thumb250.jpg"
		},
		{
			title: "Gulaal",
			id: "9ecaeca1-c7f8-4fb5-9a22-d5b5575830a7",
			img: "https://ia802206.us.archive.org/9/items/mbid-7e945b72-e6b9-450e-a53d-03a3dd4a01cf/mbid-7e945b72-e6b9-450e-a53d-03a3dd4a01cf-6391193219_thumb250.jpg"
		},
		{
			title: "Dev.D",
			id: "68ae9f5d-1b50-4d22-808c-a8bc97135e7a",
			img: "https://ia801301.us.archive.org/28/items/mbid-da9a8033-4da8-4a32-ab60-cb86b8ad7f24/mbid-da9a8033-4da8-4a32-ab60-cb86b8ad7f24-2466612300_thumb250.jpg"
		},
		{
			title: "Pakeezah",
			id: "513b355e-3683-33c1-ad89-1fd3d0cb1e5a",
			img: "https://ia800803.us.archive.org/20/items/mbid-cdc71427-6498-41b0-96a8-ef1750a8d0b2/mbid-cdc71427-6498-41b0-96a8-ef1750a8d0b2-17677816529_thumb250.jpg"
		},
		{
			title: "Kaminey",
			id: "f8fc7f3d-affd-4f61-8e21-7f4f2bc4bb00",
			img: "https://ia601005.us.archive.org/8/items/mbid-a4a03171-34d0-4756-95bb-be298478b69b/mbid-a4a03171-34d0-4756-95bb-be298478b69b-29707231437_thumb250.jpg"
		},
		{
			title: "Bajirao Mastani",
			id: "6fbd4e6e-a2c1-4353-a2af-0fa686faf615",
			img: "https://ia601406.us.archive.org/20/items/mbid-37144b37-5e19-4d73-87f4-c06fb56a86d8/mbid-37144b37-5e19-4d73-87f4-c06fb56a86d8-33821466393_thumb250.jpg"
		},
		{
			title: "Gangs of Wasseypur",
			id: "847bceba-10a4-4776-9665-2ee65ed56fb4",
			img: "https://ia904506.us.archive.org/2/items/mbid-ab2a81b6-2f29-4c83-91bb-6e17c7033768/mbid-ab2a81b6-2f29-4c83-91bb-6e17c7033768-7857931987_thumb250.jpg"
		}
	];

	const RhythmB = [
		{
			title: "Love Deluxe",
			id: "e4a67add-6aab-390c-bb82-53939fb9cd0a",
			img: "https://ia601200.us.archive.org/11/items/mbid-49c1eeeb-919f-33d2-b72d-71b3fa5572cf/mbid-49c1eeeb-919f-33d2-b72d-71b3fa5572cf-5391926442_thumb250.jpg"
		},
		{
			title: "Gemini Rights",
			id: "ab1c1fd8-f769-4d78-90bc-4677f8ad8c22",
			img: "https://dn721606.ca.archive.org/0/items/mbid-b6782fa5-d657-4116-96fd-d0175277b7bf/mbid-b6782fa5-d657-4116-96fd-d0175277b7bf-36432006507_thumb250.jpg"
		},
		{
			title: "Igor",
			id: "0f1b9e07-b38b-4bba-9794-55e0924d7177",
			img: "https://ia600602.us.archive.org/8/items/mbid-4603cee3-ece6-435c-b0b7-7d9eb1842d36/mbid-4603cee3-ece6-435c-b0b7-7d9eb1842d36-23182237048_thumb250.jpg"
		},
		{
			title: "Hurry Up Tomorrow",
			id: "14f83b04-2b9e-4974-9169-476f26475be3",
			img: "https://ia600607.us.archive.org/10/items/mbid-9617b3cb-d94c-413d-8975-c8ddc5138946/mbid-9617b3cb-d94c-413d-8975-c8ddc5138946-41158763490_thumb250.jpg"
		},
		{
			title: "Freudian",
			id: "ba660007-8e88-4301-ba89-5574d06d29cc",
			img: "https://ia601806.us.archive.org/27/items/mbid-209ad4ec-df53-4667-b45f-38413802b94b/mbid-209ad4ec-df53-4667-b45f-38413802b94b-20601164022_thumb250.jpg"
		},
		{
			title: "BEFORE LOVE CAME TO KILL US",
			id: "253b86b3-c7cb-4df1-b6eb-d0e4d69d021",
			img: "https://ia802907.us.archive.org/15/items/mbid-dd6f2743-eeb2-4b33-b3d3-f8b6789a4c49/mbid-dd6f2743-eeb2-4b33-b3d3-f8b6789a4c49-25858981726_thumb250.jpg"
		},
		{
			title: "The Slow Rush",
			id: "c6fc678e-e987-45c5-811c-e2bd09c8b902",
			img: "https://ia802801.us.archive.org/30/items/mbid-e20385dc-7631-4fb3-bd87-7c4463f8d1fa/mbid-e20385dc-7631-4fb3-bd87-7c4463f8d1fa-25428124429_thumb250.jpg"
		},
		{
			title: "channel ORANGE",
			id: "f8f4167d-897c-4b25-a171-638374d1dfa4",
			img: "https://dn721604.ca.archive.org/0/items/mbid-a942130d-bf15-4a5b-9903-a2bd69792e0a/mbid-a942130d-bf15-4a5b-9903-a2bd69792e0a-27572658405_thumb250.jpg"
		}
	];

	const Rock = [
		{
			title: "Ok Computer",
			id: "b1392450-e666-3926-a536-22c65f834433",
			img: "https://ia803409.us.archive.org/14/items/mbid-4b3d18cc-8937-36f4-8de0-481088be58e6/mbid-4b3d18cc-8937-36f4-8de0-481088be58e6-17486835783_thumb250.jpg"
		},
		{
			title: "In Utero",
			id: "2a0981fb-9593-3019-864b-ce934d97a16e",
			img: "https://ia601000.us.archive.org/25/items/mbid-7d13c434-1c49-4d7f-b164-a5247108af01/mbid-7d13c434-1c49-4d7f-b164-a5247108af01-19918667556_thumb250.jpg"
		},
		{
			title: "Sons",
			id: "0624e51-924d-4765-92d4-a70f779388a3",
			img: "https://ia801003.us.archive.org/21/items/mbid-f45dbdb4-ae07-4c1d-a1c4-0c06dfb9f558/mbid-f45dbdb4-ae07-4c1d-a1c4-0c06dfb9f558-28107918240_thumb250.jpg"
		},
		{
			title: "[Led Zeppelin IV]",
			id: "2e61da88-39e9-3473-81d2-c964cb394952",
			img: "https://ia600303.us.archive.org/35/items/mbid-c66df7b9-c773-4d7c-9a21-7d3f2518dd29/mbid-c66df7b9-c773-4d7c-9a21-7d3f2518dd29-22086503396_thumb250.jpg"
		},
		{
			title: "Queen II",
			id: "93d91bd6-1b55-3751-bca7-8b9d33beb7ef",
			img: "https://ia600209.us.archive.org/10/items/mbid-a9fbbee6-63ce-4e28-aab8-cba325c7587d/mbid-a9fbbee6-63ce-4e28-aab8-cba325c7587d-21358289134_thumb250.jpg"
		},
		{
			title: "Abbey Road",
			id: "9162580e-5df4-32de-80cc-f45a8d8a9b1d",
			img: "https://ia801006.us.archive.org/27/items/mbid-31765b9f-e969-4257-855f-c7ea1f657b2a/mbid-31765b9f-e969-4257-855f-c7ea1f657b2a-39706767821_thumb250.jpg"
		},
		{
			title: "Comedown machine",
			id: "461e255f-b56e-4788-b989-8ff610242b94",
			img: "https://ia904506.us.archive.org/14/items/mbid-4794d2e4-698e-4ad4-9107-50ba68ed68eb/mbid-4794d2e4-698e-4ad4-9107-50ba68ed68eb-8304126374_thumb250.jpg"
		},
		{
			title: "Talking Heads: 77",
			id: "d99084ee-de04-3ba1-8203-5f1a7e5355ee",
			img: "https://ia601506.us.archive.org/30/items/mbid-57be3031-d63c-4c31-9be0-1d773a43eee9/mbid-57be3031-d63c-4c31-9be0-1d773a43eee9-33606688526_thumb250.jpg"
		}
	];

	const CarouselAlbum = [
		{title: "Kagaz Ke Phool", id: "a15db526-c6a3-4661-8b34-b7eee2a5cb30", img: "https://ia801007.us.archive.org/11/items/mbid-de4e39f6-ac44-4fa4-92d6-c93543d92c59/mbid-de4e39f6-ac44-4fa4-92d6-c93543d92c59-37972098875_thumb250.jpg"},
		{title: "Playboi Carti", id: "8821f75c-6469-4aec-a357-c48e872fd83a", img: "https://ia800302.us.archive.org/22/items/mbid-3dc8ab2e-e55d-4000-95e3-144d18a30824/mbid-3dc8ab2e-e55d-4000-95e3-144d18a30824-38743482205_thumb250.jpg"},
		{title: "Dark Times", id: "ca6d37f2-b478-4317-b529-8f0ac0e351a9", img: "https://ia600401.us.archive.org/0/items/mbid-3de6bff9-eafa-477f-827e-34a9da2c15a2/mbid-3de6bff9-eafa-477f-827e-34a9da2c15a2-38898828891_thumb250.jpg"},
		{title: "Fetch the Bolt Cutters", id: "882db6d8-e28b-46ba-8a30-277e86fbddf7", img: "https://dn721608.ca.archive.org/0/items/mbid-51f08309-cfad-478b-a25d-ee61ba4acc26/mbid-51f08309-cfad-478b-a25d-ee61ba4acc26-25960785041_thumb250.jpg"},
		{title: "My Name Is Khan", id: "409dbceb-747a-48ee-b532-10865be86ab4", img: "https://ia803105.us.archive.org/11/items/mbid-aa0cb55c-4206-4582-bee3-280b88147a10/mbid-aa0cb55c-4206-4582-bee3-280b88147a10-19654910077_thumb250.jpg"},
		{title: "TENET", id: "f1425c7b-527e-4974-bb53-7e4f4aa0fc04", img: "https://ia801709.us.archive.org/30/items/mbid-a997bc23-9a79-44cd-86b3-3f24b2a961d8/mbid-a997bc23-9a79-44cd-86b3-3f24b2a961d8-27176316363_thumb250.jpg"},
		{title: "Barfi!", id: "0610a281-bc08-4a90-88af-f3c7e9c6d408", img: "https://ia801603.us.archive.org/8/items/mbid-ed59ad4f-a3e3-460f-8b89-0970a8c6882d/mbid-ed59ad4f-a3e3-460f-8b89-0970a8c6882d-6410113685_thumb250.jpg"},
		{title: "The Rise and Fall of a Midwest Princess", id: "eda0f5d3-44eb-42cf-bcfd-5c9f93e05c7a", img: "https://ia800500.us.archive.org/34/items/mbid-19febf01-a08f-4504-9930-ab37dab30c73/mbid-19febf01-a08f-4504-9930-ab37dab30c73-36903536316_thumb250.jpg"},
		{title: "Do Badan", id: "fed61c80-589c-4cd6-896a-b71cb3449db5", img: "https://ia801609.us.archive.org/30/items/mbid-9df8a38d-4631-4bb5-9a62-fdb39914f453/mbid-9df8a38d-4631-4bb5-9a62-fdb39914f453-39421441840_thumb250.jpg"},
		{title: "Definitely Maybe", id: "451dca98-c118-32e1-9244-c47ca9c3c0f9", img: "https://ia902205.us.archive.org/12/items/mbid-d6f68975-dc8f-4e91-ac6f-0061b2adb325/mbid-d6f68975-dc8f-4e91-ac6f-0061b2adb325-31844190146_thumb250.jpg"},
		{title: "Guzaarish", id: "8b008dc5-3205-4a6f-9ba8-5a54b9b71866", img: "https://ia601307.us.archive.org/2/items/mbid-2229dd16-ba4c-4c90-a370-ca3dbed740aa/mbid-2229dd16-ba4c-4c90-a370-ca3dbed740aa-38061982363_thumb250.jpg"},
		{title: "Doris", id: "6de45ac3-5eca-44c4-8b71-cdc60c41bf5d", img: "https://ia802807.us.archive.org/3/items/mbid-0dfef043-6f1b-49d6-9a60-891c9f667e1e/mbid-0dfef043-6f1b-49d6-9a60-891c9f667e1e-25512097347_thumb250.jpg"},
	];
</script>

<main>
	<section class="flex flex-col items-center mt-5 gap-5">
		<Carousel images="{CarouselAlbum}" />
		<div class="flex flex-col md:flex-row md:mx-20 gap-10 w-[95%] md:w-[85%]">
			<Albumboard headername="Bollywood" images="{Bollywood}" />
			<Albumboard headername="R&B" images="{RhythmB}" />
		</div>
		<div class="flex flex-col md:flex-row md:mx-20 gap-10 w-[95%] md:w-[85%]">
			<Albumboard headername="HipHop" images="{HipHop}" />
			<Albumboard headername="Rock" images="{Rock}" />
		</div>
	</section>
</main>
