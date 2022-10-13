/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import {__} from '@wordpress/i18n';
import {useSelect} from '@wordpress/data';
/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {useBlockProps} from '@wordpress/block-editor';

const {RichText, InspectorControls, BlockControls, AlignmentToolbar} = wp.blockEditor;
const {
	ToggleControl,
	PanelBody,
	PanelRow,
	CheckboxControl,
	SelectControl,
	ColorPicker,
	Toolbar,
	IconButton
} = wp.components;
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({attributes, setAttributes}) {
  const exceptPostTypes = [""]
	const postTypes = useSelect((select) => {
		const {getPostTypes} = select('core');
		const postTypesData = getPostTypes() ?? [];
		return postTypesData.map((r) => {
			return {
				label: r.name,
				value: r.slug
			}
		})

	})

	const postTypesData = useSelect((select) => {
		const {getEntityRecords} = select('core');
		const postTypesData = getEntityRecords('postType',attributes.postType) ?? [];
		return postTypesData.map((r) => {
			return {
				label: r.title.rendered,
				value: r.slug
			}
		})

	})


	attributes.postData = postTypesData;
	return (
		<div {...useBlockProps()}>
			<InspectorControls>
				<PanelBody
					title="Most awesome settings ever"
					initialOpen={true}
				>

					<PanelRow>
						<SelectControl
							label="Select Post Type"
							value={attributes.postType}
							options={postTypes}
							onChange={(newval) => setAttributes({postType: newval})}
						/>
					</PanelRow>


				</PanelBody>
			</InspectorControls>
			<div>
				{postTypesData.map((r)=>{
					return <h5>{r.label}</h5>
				})}
			</div>
		</div>
	);
}
