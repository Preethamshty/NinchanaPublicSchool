/**
 * Sends contact and newsletter submissions to ninchanapublicschool@gmail.com.
 * Uses FormSubmit on local/Live Server; uses mail.php on hosted PHP servers.
 */
(function ($) {
    'use strict';

    var SCHOOL_EMAIL = 'ninchanapublicschool@gmail.com';
    var FORM_SUBMIT_AJAX = 'https://formsubmit.co/ajax/' + encodeURIComponent(SCHOOL_EMAIL);
    var PHP_MAIL = 'mail.php';

    function isLocalDev() {
        var host = window.location.hostname;
        return (
            !host ||
            host === 'localhost' ||
            host === '127.0.0.1' ||
            window.location.protocol === 'file:'
        );
    }

    function getEndpoint() {
        return isLocalDev() ? FORM_SUBMIT_AJAX : PHP_MAIL;
    }

    function getPageLabel() {
        return document.title || window.location.pathname;
    }

    function ensureMessages($form) {
        if (!$form.find('.form-messages').length) {
            $form.append('<p class="form-messages mb-0 mt-2"></p>');
        }
        return $form.find('.form-messages').first();
    }

    function showMessage($messages, isSuccess, text) {
        $messages.removeClass('success error').addClass(isSuccess ? 'success' : 'error').text(text);
    }

    function buildPayload($form, formType) {
        var data = {};
        $.each($form.serializeArray(), function (_, field) {
            data[field.name] = field.value;
        });

        data.form_type = formType;
        data.page = getPageLabel();

        if (isLocalDev()) {
            data._ajax = 'true';
            data._captcha = 'false';
            data._template = 'table';

            if (formType === 'newsletter') {
                data._subject = 'Newsletter subscription - Ninchana Public School';
                data.message =
                    'Newsletter subscription request.\n\nEmail: ' +
                    (data.email || '') +
                    '\nPage: ' +
                    data.page;
            } else {
                data._subject = 'Contact form - Ninchana Public School';
                data.message =
                    'Name: ' +
                    (data.name || '') +
                    '\nEmail: ' +
                    (data.email || '') +
                    '\nPhone: ' +
                    (data.number || '') +
                    '\nSubject: ' +
                    (data.subject || '') +
                    '\nPage: ' +
                    data.page +
                    '\n\nMessage:\n' +
                    (data.message || '');
            }
        }

        return data;
    }

    function sendForm($form, formType) {
        var $messages = ensureMessages($form);
        var endpoint = getEndpoint();
        var payload = buildPayload($form, formType);

        if (formType === 'newsletter') {
            var email = payload.email || $form.find('input[type="email"]').val();
            if (!email || !/^[\w\-.]+@([\w-]+\.)+[\w-]{2,}$/i.test(email)) {
                $form.find('input[type="email"]').addClass('is-invalid');
                showMessage($messages, false, 'Please enter a valid email address.');
                return;
            }
            $form.find('input[type="email"]').removeClass('is-invalid');
        }

        $form.find('button[type="submit"], input[type="submit"]').prop('disabled', true);

        $.ajax({
            url: endpoint,
            method: 'POST',
            data: payload,
            dataType: endpoint === FORM_SUBMIT_AJAX ? 'json' : 'text',
        })
            .done(function (response) {
                var text =
                    typeof response === 'object' && response.success
                        ? response.success
                        : response;
                showMessage($messages, true, text);
                $form.find('input:not([type="hidden"]):not([type="submit"]), textarea, select').val('');
                $form.find('input[type="checkbox"]').prop('checked', false);
            })
            .fail(function (xhr) {
                var text =
                    xhr.responseJSON && xhr.responseJSON.error
                        ? xhr.responseJSON.error
                        : xhr.responseText ||
                          'Sorry, we could not send your message. Please email ' +
                              SCHOOL_EMAIL +
                              ' directly.';
                showMessage($messages, false, text);
            })
            .always(function () {
                $form.find('button[type="submit"], input[type="submit"]').prop('disabled', false);
            });
    }

    function prepareContactForm($form) {
        $form.find('input[placeholder="Your Name"]').first().attr({ name: 'name', type: 'text' });
        $form
            .find('input[placeholder="Your Email"]')
            .first()
            .attr({ name: 'email', type: 'email' });

        if (!$form.find('[name="message"]').length) {
            $form.find('textarea').first().attr('name', 'message');
        }

        if (!$form.find('[name="form_type"]').length) {
            $form.append('<input type="hidden" name="form_type" value="contact">');
        }

        if (!$form.find('[name="page"]').length) {
            $form.append('<input type="hidden" name="page" value="">');
        }
        $form.find('[name="page"]').val(getPageLabel());
        $form.attr({ action: getEndpoint(), method: 'POST' });
        ensureMessages($form);
    }

    function prepareNewsletterForm($form) {
        $form.find('input[type="email"]').first().attr({ name: 'email', required: true });

        if (!$form.find('[name="form_type"]').length) {
            $form.append('<input type="hidden" name="form_type" value="newsletter">');
        }

        if (!$form.find('[name="page"]').length) {
            $form.append('<input type="hidden" name="page" value="">');
        }
        $form.find('[name="page"]').val(getPageLabel());
        $form.attr({ action: getEndpoint(), method: 'POST' });
        ensureMessages($form);
    }

    $(function () {
        $('.newsletter-form').each(function () {
            var $form = $(this);
            prepareNewsletterForm($form);
            $form.off('submit.ninchana').on('submit.ninchana', function (event) {
                event.preventDefault();
                sendForm($form, 'newsletter');
            });
        });

        $('.ajax-contact').each(function () {
            prepareContactForm($(this));
        });
    });
})(jQuery);
