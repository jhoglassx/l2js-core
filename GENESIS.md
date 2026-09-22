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

## High Five compatibility audit

The Genesis branch is not a generic copy of the upstream C4 runtime. It is the low-level parser used by the Genesis High Five migration pipeline.

Validated/fixed compatibility points in this branch:

- UE2 package headers remain version-driven through `archiveFileVersion` and `licenseeVersion`; no C4 map-specific header/count assertions remain in the parser.
- unknown UE2 native bytecode values at or above `ExprToken_T.MaxConversion` are parsed as native calls even when the diagnostic registry has no friendly name. High Five uses such native indices.
- `GlowModifier` is recognized as a UTX dependency for High Five material graphs.

Important boundary: this repository only owns low-level package/serialization behavior. StaticMesh, Terrain, actor and material semantics are audited in the Genesis Lineage2JS fork. UE5 conversion is not implemented here.

The upstream `stable` branch remains the reference implementation. High Five-specific changes stay isolated on `genesis/stable` so upstream updates can still be compared deliberately.
