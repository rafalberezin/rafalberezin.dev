import Blockquote from './Blockquote.svelte'
import Break from './Break.svelte'
import Code from './Code.svelte'
import Definition from './Definition.svelte'
import Delete from './Delete.svelte'
import Emphasis from './Emphasis.svelte'
import FootnoteDefinition from './FootnoteDefinition.svelte'
import FootnoteReference from './FootnoteReference.svelte'
import Heading from './Heading.svelte'
import Html from './Html.svelte'
import Image from './Image.svelte'
import ImageReference from './ImageReference.svelte'
import InlineCode from './InlineCode.svelte'
import Link from './Link.svelte'
import LinkReference from './LinkReference.svelte'
import List from './List.svelte'
import ListItem from './ListItem.svelte'
import Paragraph from './Paragraph.svelte'
import Section from './Section.svelte'
import Strong from './Strong.svelte'
import Table from './Table.svelte'
import TableCell from './TableCell.svelte'
import TableRow from './TableRow.svelte'
import Text from './Text.svelte'
import ThematicBreak from './ThematicBreak.svelte'
import Yaml from './Yaml.svelte'
import type { Component } from 'svelte'
import type { RootContentMap } from 'mdast'

type MdastComponentMap = {
	[K in keyof RootContentMap]: Component<{ block: RootContentMap[K] }>
}

const components: MdastComponentMap = {
	blockquote: Blockquote,
	break: Break,
	code: Code,
	definition: Definition,
	delete: Delete,
	emphasis: Emphasis,
	footnoteDefinition: FootnoteDefinition,
	footnoteReference: FootnoteReference,
	heading: Heading,
	html: Html,
	image: Image,
	imageReference: ImageReference,
	inlineCode: InlineCode,
	link: Link,
	linkReference: LinkReference,
	list: List,
	listItem: ListItem,
	paragraph: Paragraph,
	section: Section,
	strong: Strong,
	table: Table,
	tableCell: TableCell,
	tableRow: TableRow,
	text: Text,
	thematicBreak: ThematicBreak,
	yaml: Yaml
}

export default components
