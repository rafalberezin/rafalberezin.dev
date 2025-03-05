<script lang="ts">
	import type { ProjectData } from '$lib/types/project'
	import {
		LucideCalendar,
		LucideCalendarSync,
		LucideGitCommitVertical,
		LucideGithub,
		LucideScale,
		LucideStar,
		LucideTags
	} from 'lucide-svelte'
	import Tags from './Tags.svelte'
	import type { Snippet } from 'svelte'

	interface Props {
		project: ProjectData
		children?: Snippet
	}

	const { project, children }: Props = $props()
	const {
		title,
		description,
		license,
		source,
		latest_version,
		tags,
		featured,
		created_at,
		updated_at
	} = project
</script>

<div class="info">
	<h2 class="title">
		{#if featured}
			<span class="featured">
				<LucideStar aria-hidden="true" fill="currentcolor" />
			</span>
		{/if}
		{title}
	</h2>

	{#if description}
		<p class="description">{description}</p>
	{/if}

	<ul>
		{#if latest_version}
			<li class="version info-line">
				<span class="icon"><LucideGitCommitVertical aria-hidden="true" /></span>
				<span class="name">Version: </span>
				<span class="value badge">{latest_version}</span>
			</li>
		{/if}

		{#if license}
			<li class="license info-line">
				<span class="icon"><LucideScale aria-hidden="true" /></span>
				<span class="name">License: </span>
				<span class="value badge">
					{license.endsWith(' License') ? license.substring(0, license.length - 8) : license}
				</span>
			</li>
		{/if}

		{#if source}
			<li class="source info-line">
				<span class="icon"><LucideGithub aria-hidden="true" /></span>
				<a class="hover-bg" href={source}><span class="name">Source</span></a>
			</li>
		{/if}

		{#if tags}
			<li class="tags info-line">
				<span class="icon"><LucideTags aria-hidden="true" /></span>
				<span class="name">Tags: </span>
				<span class="value"><Tags {tags} /></span>
			</li>
		{/if}

		<li class="created faded info-line">
			<span class="icon"><LucideCalendar aria-hidden="true" size="19.2" /></span>
			<span class="name">Created: </span>
			<span class="value badge">
				{created_at}
			</span>
		</li>

		<li class="updated faded info-line">
			<span class="icon"><LucideCalendarSync aria-hidden="true" size="19.2" /></span>
			<span class="name">Updated: </span>
			<span class="value badge">
				{updated_at}
			</span>
		</li>
	</ul>

	{@render children?.()}
</div>

<style>
	.info {
		padding: 1em 2em;
	}

	.title {
		margin-bottom: 1rem;
		color: var(--accent-color);
	}

	.featured {
		display: inline-block;
		color: var(--yellow);
	}

	.description {
		font-size: 1.2rem;
		margin-bottom: 1rem;
	}

	ul {
		list-style-type: none;
	}

	.info-line {
		display: flex;
		align-items: center;
		gap: 0.5em;
		margin-bottom: 0.5em;

		.icon {
			color: var(--accent-color);
		}

		.name {
			letter-spacing: 1px;
		}

		.badge {
			padding: 0.25em 0.5em;
			background-color: var(--mantle);
			font-family: var(--font-mono);
		}

		&.faded {
			font-size: 0.8rem;
			color: var(--subtext-0);

			.icon {
				color: var(--subtext-0);
			}

			.badge {
				background-color: transparent;
				border: 1px solid var(--surface-0);
			}
		}
	}
</style>
