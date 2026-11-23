
# Strict Step-by-Step Instructions

## Fixed local paths

Use these exact local paths.

### Windows
- `C:\TENIR\dropzone`
- `C:\TENIR\canon`
- `C:\TENIR\rc`

### Required RC repo directories inside `C:\TENIR\rc`
- `C:\TENIR\rc\TENIR_Phase1_SDK_vKplus4_RC`
- `C:\TENIR\rc\TENIR_Phase2_Governance_vKplus4_RC`

## Step 1
Create the folders:

```powershell
mkdir C:\TENIR
mkdir C:\TENIR\dropzone
mkdir C:\TENIR\canon
mkdir C:\TENIR\rc
```

## Step 2
Put the extracted RC repos inside `C:\TENIR\rc` so that these two paths exist:

- `C:\TENIR\rc\TENIR_Phase1_SDK_vKplus4_RC`
- `C:\TENIR\rc\TENIR_Phase2_Governance_vKplus4_RC`

## Step 3
From this dossier, copy these files directly into `C:\TENIR\dropzone`:

- `create_tenir_repo_structure.sh`
- `TENIR_Document_Index.md`
- `TENIR_Classification_Policy.md`
- `TENIR_Legacy_Reclassification_Register.md`
- `TENIR_2_0_Documentation_Bundle.zip`
- `TENIR_2_0_Operational_Doctrine_Pack.zip`
- `TENIR_2_0_Schema_Pack_Update.zip`
- `TENIR_2_0_Close_Loop_Pack.zip`
- `TENIR_2_0_Enforcement_Starter_Pack.zip`
- `TENIR_2_0_Compliance_Validator_Package.zip`
- `TENIR_2_0_Platform_Wide_Policy_Engine_Pack.zip`
- `TENIR_2_0_Regression_Infrastructure_Pack.zip`
- `TENIR_2_0_Complete_Governance_Runtime_Pack.zip`
- `TENIR_2_0_Integration_Meta_Pack.zip`
- `TENIR_2_0_RC_Actual_Patches.zip`

## Step 4
Unzip this file into `C:\TENIR\dropzone`:
- `03_RC_Integration/TENIR_2_0_Execution_Orchestration_Pack_v2.zip`

After that, this script must exist:
- `C:\TENIR\dropzone\TENIR_2_0_Execution_Orchestration_Pack_v2\scripts\powershell\orchestrate_tenir2_v2.ps1`

## Step 5
Run exactly this command:

```powershell
powershell -ExecutionPolicy Bypass -File "C:\TENIR\dropzone\TENIR_2_0_Execution_Orchestration_Pack_v2\scripts\powershell\orchestrate_tenir2_v2.ps1"
```

## Step 6
Success condition:
this file must exist after execution:

- `C:\TENIR\canon\81_HANDOFF\HANDOFF_READY.txt`

## Step 7
Hand the other agent exactly these two roots:
- `C:\TENIR\canon`
- `C:\TENIR\rc`
