# Genesis fork

This fork is maintained for low-level Unreal package parsing required by the Lineage2 High Five -> Unreal Engine 5 Genesis migration pipeline.

## Upstream

- Repository: realratchet/l2js-core
- Upstream branch: stable
- Genesis base branch: genesis/stable

## Scope

Keep only low-level Unreal serialization/parsing changes here:

- UObject/package loading
- import/export tables
- property tags and property decoding
- arrays/object references
- class defaults and inheritance
- binary compatibility fixes required by High Five packages

Higher-level Lineage II semantics belong in jhoglassx/Lineage2JS.
UE5-specific conversion belongs in jhoglassx/Lineage2_H5_Genesis.

Changes should remain generic and should not be keyed to individual H5 assets or maps.
