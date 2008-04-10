#!/bin/bash
# vim:noet:ts=4

(

BASEDIR=${0%/*}
if test "$BASEDIR" = "$0" ; then
	BASEDIR="$(which $0)"
	BASEDIR=${BASEDIR%/*}
fi

cd "$BASEDIR"

CONFIG="$1";

[ -z "$CONFIG" ] && echo "usage: $0 <bootstrap_config>" && exit;

JSDIR="/openils/var/web/opac/common/js/";
FMDOJODIR="/openils/var/web/js/fieldmapper/";
SLIMPACDIR="/openils/var/web/opac/extras/slimpac/";

echo "Updating fieldmapper";
perl fieldmapper.pl "$CONFIG"	> "$JSDIR/fmall.js";

echo "Updating web_fieldmapper";
perl fieldmapper.pl "$CONFIG" "web_core"	> "$JSDIR/fmcore.js";

echo "Updating OrgTree";
perl org_tree_js.pl "$CONFIG" > "$JSDIR/OrgTree.js";
cp "$JSDIR/OrgTree.js" "$FMDOJODIR/"

echo "Updating OrgTree HTML";
perl org_tree_html_options.pl "$CONFIG" "$SLIMPACDIR/lib_list.inc";

echo "Done";

)

