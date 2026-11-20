# TENIR N° 01 — Windows PDF candidate review (2026-11-20)

**Disposition: STRUCTURAL_PASS / VISUAL_SPOTCHECK_PASS / PUBLICATION_HOLD.**

This records the Windows-generated FR/EN/AR candidate produced by the CI workflow, not an authorization to replace the published binaries. The original incomplete PR #81 remains distinct.

## Source and environment
- PR #111; Windows validation run [44826712635](https://github.com/skiredj-prog/skiredj-prog.github.io/actions/runs/44826712635).
- Candidate GitHub Actions artifact ID `14675100243`: `TENIR-N01-Windows-candidate`, available until 27 November 2026.
- Merge-checkout SHA embedded in the PDF build metadata: `5d64d142283ac44bb5859961c4360542909ef099`.
- Windows runner, Python 3.12.10; verified fonts: Arial, Arial Bold, Georgia Bold, Tahoma, Tahoma Bold from the runner Windows Fonts directory. No fonts exported.
- Libraries recorded in `PDF_BUILD_METADATA.json`: ReportLab 4.5.1, Pillow 13.0.0, pypdf 6.21.4, python-bidi 0.6.12, arabic-reshaper 3.0.0.

## Artifact integrity

| Edition | Size | SHA-256 |
| --- | ---: | --- |
| FR | 2,742,573 bytes | `0c2fa2ec37cd459ca234b0ed0e082e7a361512d581b4fb75cc481158d1ba1619` |
| EN | 2,738,948 bytes | `45b6b97b6b93bd32abe44525f551777bc3cbf3f11f97da156f46cc3dea448511` |
| AR | 2,753,965 bytes | `236f00034a88cf0d34b7e59f35667b1c78ae0473e10b2d86cb7d777e101730c7` |

The `SHA256SUMS.txt` entries matched local SHA-256 recalculation after downloading and unpacking the exact GitHub Actions artifact. Each edition has 16 A5 pages, expected title metadata and the updated quiz label. The Arabic verification checks the logical Unicode embedded in PDF `/ActualText` markers on page 15; extracting only visual shaped glyphs is insufficient.

## Independent spot-check on downloaded candidates

All 48 pages were rendered to a low-resolution visual overview. Pages 1, 5, 15 and 16 were additionally rendered at 125 DPI in all three languages. In this spot-check:
- All three cover layouts are present.
- Page 5 displays its list and callout without visible text clipping or collision in the inspected renderings.
- Page 15 contains the question list, deliberately inverted answer key and sources; the Arabic answer line becomes legible on 180-degree rotation, as intended.
- Page 16 presents feedback options and a QR code in FR/EN/AR.
- No visually obvious severe clipping was identified in the 48-page contact sheets. This is not a full proof of visual parity with the previous publication.
- PDF link annotations were inspected: FR 22, EN 21, AR 20, all without the retired site email `expired tenirlabs.cc mailbox`.

## Release gate remains open

1. Confirm editorial approval for replacement of three existing PDFs, including typography and interpretation of Arabic RTL.
2. Pin exact binary SHA and CI build record in a dedicated release PR. Do not rewrite source doctrine or change technical claims as part of this publishing step.
3. Add the three actual candidate PDF binaries and updated `SHA256SUMS.txt` to the release branch after review; they are **not** part of this build-tool PR.
4. Repeat verification and check the download links, QR destinations, visual layout and PDFs on the production site after deployment.
5. Close original PDF PR #81 only after its replacement status is documented (superseded or completed), not merely because this build CI is green.

**No external production publication is claimed.**
