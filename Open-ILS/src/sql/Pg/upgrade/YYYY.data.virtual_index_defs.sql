BEGIN;

INSERT INTO config.metabib_field (id, field_class, name, label, browse_field)
    VALUES (45, 'keyword', 'blob', 'All searchable fields', FALSE);

INSERT INTO config.metabib_field_virtual_map (real, virtual)
    SELECT  id,
            45
      FROM  config.metabib_field
      WHERE search_field
            AND id NOT IN (15, 45);

UPDATE config.metabib_field SET xpath=$$//mods32:mods/mods32:subject[not(descendant::mods32:geographicCode)]$$ WHERE id = 16;

COMMIT;

\qecho 
\qecho Reingesting all records.  This may take a while. 
\qecho This command can be stopped (control-c) and rerun later if needed: 
\qecho 
\qecho DO $FUNC$
\qecho DECLARE
\qecho     same_marc BOOL;
\qecho BEGIN
\qecho     SELECT INTO same_marc enabled FROM config.internal_flag WHERE name = 'ingest.reingest.force_on_same_marc';
\qecho     UPDATE config.internal_flag SET enabled = true WHERE name = 'ingest.reingest.force_on_same_marc';
\qecho     UPDATE biblio.record_entry SET id=id WHERE not deleted AND id > 0;
\qecho     UPDATE config.internal_flag SET enabled = same_marc WHERE name = 'ingest.reingest.force_on_same_marc';
\qecho END;
\qecho $FUNC$;

DO $FUNC$
DECLARE
    same_marc BOOL;
BEGIN
    SELECT INTO same_marc enabled FROM config.internal_flag WHERE name = 'ingest.reingest.force_on_same_marc';
    UPDATE config.internal_flag SET enabled = true WHERE name = 'ingest.reingest.force_on_same_marc';
    UPDATE biblio.record_entry SET id=id WHERE not deleted AND id > 0;
    UPDATE config.internal_flag SET enabled = same_marc WHERE name = 'ingest.reingest.force_on_same_marc';
END;
$FUNC$;
