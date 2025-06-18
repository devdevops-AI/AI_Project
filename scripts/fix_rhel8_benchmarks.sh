#!/bin/bash
# fix_rhel8_benchmarks.sh
# Apply RHEL 8 security benchmarks remediation using OpenSCAP.
# Run as root or with sudo.

set -euo pipefail

PACKAGES="scap-security-guide openscap-scanner"

if ! rpm -q scap-security-guide >/dev/null 2>&1 || ! rpm -q openscap-scanner >/dev/null 2>&1; then
    echo "Installing required packages..."
    sudo dnf install -y ${PACKAGES}
fi

DATASTREAM="/usr/share/xml/scap/ssg/content/ssg-rhel8-ds.xml"
RESULTS="/tmp/oscap-results.xml"

if [ ! -f "$DATASTREAM" ]; then
    echo "Error: $DATASTREAM not found."
    exit 1
fi

sudo oscap xccdf eval \
    --profile xccdf_org.ssgproject.content_profile_stig \
    --results "${RESULTS}" \
    --remediate \
    "$DATASTREAM"

echo "Remediation complete. Results saved to ${RESULTS}"
